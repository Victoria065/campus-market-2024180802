<template>
  <main class="page">
    <div class="page-banner banner-msg">
      <div class="banner-text">
        <h1>💬 消息中心</h1>
        <p>私信、通知、互动消息，随时查看不遗漏</p>
      </div>
    </div>

    <div class="msg-tabs">
      <span
        v-for="t in tabs"
        :key="t"
        class="tab"
        :class="{ active: activeTab === t }"
        @click="activeTab = t"
      >
        {{ t }}
        <span v-if="t === '私信' && unreadCount" class="badge">{{ unreadCount }}</span>
      </span>
    </div>

    <LoadingState v-if="loading" text="正在加载消息..." />

    <ErrorState
      v-else-if="error"
      :message="error"
      @retry="loadMessages"
    />

    <!-- 私信 — 按对话分组 -->
    <div v-else-if="activeTab === '私信' && conversations.length" class="msg-list">
      <div
        v-for="conv in conversations"
        :key="conv.partner"
        class="msg-card"
        :class="{ unread: conv.unread }"
        @click="openConversation(conv)"
      >
        <div class="msg-avatar" :style="{ background: avatarBg(conv.partner) }">
          {{ conv.partner.charAt(0) }}
        </div>
        <div class="msg-body">
          <div class="msg-top">
            <span class="msg-name">{{ conv.partner }}</span>
            <span class="msg-time">{{ conv.latest.time }}</span>
          </div>
          <p class="msg-text">{{ conv.latest.content }}</p>
        </div>
        <div v-if="conv.unread" class="unread-dot"></div>
      </div>
    </div>

    <!-- 系统通知 / 互动消息 -->
    <div v-else-if="activeTab !== '私信' && displayMessages.length" class="msg-list">
      <div
        v-for="msg in displayMessages"
        :key="msg.id"
        class="msg-card"
        :class="{ unread: !msg.read }"
        @click="markRead(msg)"
      >
        <div class="msg-avatar" :style="{ background: avatarBg(msg.fromUserName) }">
          {{ msg.fromUserName.charAt(0) }}
        </div>
        <div class="msg-body">
          <div class="msg-top">
            <span class="msg-name">{{ msg.fromUserName }}</span>
            <span class="msg-time">{{ msg.time }}</span>
          </div>
          <p class="msg-text">{{ msg.content }}</p>
        </div>
      </div>
    </div>

    <EmptyState
      v-else
      message="暂无消息"
      hint="当有人联系你或系统发送通知时，消息会出现在这里"
    />

    <!-- 聊天弹窗 -->
    <el-dialog
      v-model="chatVisible"
      :title="'与 ' + chatTarget + ' 的对话'"
      width="480px"
      destroy-on-close
      @closed="loadMessages"
    >
      <div class="chat-body">
        <div
          v-for="m in chatMessages"
          :key="m.id"
          class="chat-bubble"
          :class="{ mine: m.fromUserId === userStore.userId }"
        >
          <div class="bubble-text">{{ m.content }}</div>
          <div class="bubble-time">{{ m.time }}</div>
        </div>
        <div v-if="!chatMessages.length" class="empty-chat">暂无消息记录</div>
      </div>
      <div class="chat-input-row">
        <el-input
          v-model="replyText"
          placeholder="输入回复..."
          @keyup.enter="sendReply"
        />
        <el-button type="primary" size="small" @click="sendReply" :disabled="!replyText.trim()">
          发送
        </el-button>
      </div>
    </el-dialog>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getAllMessages, sendMessage, markAsRead, type MessageItem } from '../api/message'
import { useUserStore } from '../stores/user'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'
import EmptyState from '../components/EmptyState.vue'

const userStore = useUserStore()

const tabs = ['私信', '系统通知', '互动消息']
const activeTab = ref('私信')
const messages = ref<MessageItem[]>([])
const loading = ref(true)
const error = ref('')
const chatVisible = ref(false)
const chatTarget = ref('')
const replyText = ref('')

interface Conversation {
  partner: string
  latest: MessageItem
  unread: boolean
}

// 对话列表：按对方名字分组
const conversations = computed(() => {
  const currentUid = userStore.userId || 'u1'
  const userMsgs = messages.value.filter(
    (m) => m.fromUserId !== 'system'
      && (m.toUserId === currentUid || m.fromUserId === currentUid || m.toUserId === userStore.displayName)
  )
  const map = new Map<string, MessageItem[]>()
  for (const m of userMsgs) {
    const partner = m.fromUserId === currentUid || m.fromUserName === userStore.displayName
      ? (m.toUserId)
      : m.fromUserName
    if (!map.has(partner)) map.set(partner, [])
    map.get(partner)!.push(m)
  }
  const result: Conversation[] = []
  for (const [partner, msgs] of map) {
    msgs.sort((a, b) => b.time.localeCompare(a.time))
    result.push({
      partner,
      latest: msgs[0]!,
      unread: msgs.some((m) => !m.read && m.fromUserId !== currentUid && m.fromUserName !== userStore.displayName),
    })
  }
  result.sort((a, b) => b.latest.time.localeCompare(a.latest.time))
  return result
})

// 未读私信数 = 有未读消息的对话数
const unreadCount = computed(() => conversations.value.filter((c) => c.unread).length)

const displayMessages = computed(() => {
  if (activeTab.value === '系统通知')
    return messages.value.filter((m) => m.fromUserId === 'system' && m.fromUserName === '系统通知')
  if (activeTab.value === '互动消息')
    return messages.value.filter((m) => m.fromUserId === 'system' && m.fromUserName === '互动消息')
  return messages.value
})

// 当前对话的消息
const chatMessages = computed(() => {
  const currentUid = userStore.userId || 'u1'
  return messages.value
    .filter((m) =>
      (m.fromUserName === chatTarget.value || m.toUserId === chatTarget.value)
      && m.fromUserId !== 'system'
    )
    .sort((a, b) => a.time.localeCompare(b.time))
})

function avatarBg(name: string): string {
  const colors = [
    'linear-gradient(135deg, #eef2ff, #e0e7ff)',
    'linear-gradient(135deg, #fdf2f8, #fce7f3)',
    'linear-gradient(135deg, #ecfdf5, #d1fae5)',
    'linear-gradient(135deg, #fffbeb, #fef3c7)',
    'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
  ]
  return colors[name.length % colors.length]!
}

async function loadMessages() {
  loading.value = true
  error.value = ''
  try {
    const all = await getAllMessages()
    const currentUid = userStore.userId || 'u1'
    messages.value = all.filter(
      (m) => m.toUserId === currentUid || m.fromUserId === currentUid
        || m.fromUserId === 'system' || m.toUserId === userStore.displayName
        || m.fromUserName === userStore.displayName
    )
  } catch {
    messages.value = [
      { id: 'fb1', fromUserId: 'system', fromUserName: '系统通知', toUserId: 'u1', content: '欢迎来到校园轻集市！', time: '2026-07-01 08:00', read: true },
      { id: 'fb2', fromUserId: 'u2', fromUserName: '王同学', toUserId: 'u1', content: '你好，教材还在吗？', time: '2026-07-02 09:30', read: false },
      { id: 'fb3', fromUserId: 'system', fromUserName: '互动消息', toUserId: 'u1', content: '你的商品被收藏了', time: '2026-07-01 14:20', read: false },
    ]
  } finally {
    loading.value = false
  }
}

function openConversation(conv: Conversation) {
  chatTarget.value = conv.partner
  chatVisible.value = true
}

async function markRead(msg: MessageItem) {
  if (msg.read) return
  try { await markAsRead(msg.id); msg.read = true } catch { /* ignore */ }
}

async function sendReply() {
  if (!replyText.value.trim()) return
  try {
    await sendMessage({
      fromUserId: userStore.userId,
      fromUserName: userStore.displayName,
      toUserId: chatTarget.value,
      content: replyText.value.trim(),
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
      read: true,
    })
    // 标记对方发来的消息为已读
    for (const m of messages.value) {
      if (m.fromUserName === chatTarget.value && !m.read) {
        try { await markAsRead(m.id); m.read = true } catch { /* ignore */ }
      }
    }
    replyText.value = ''
    ElMessage.success('已发送')
    await loadMessages()
  } catch { ElMessage.error('发送失败') }
}

onMounted(() => { loadMessages() })
</script>

<style scoped>
.page { padding: 0; }

.page-banner {
  border-radius: var(--radius-lg); padding: 36px 32px; margin-bottom: 24px; color: #fff;
  position: relative; overflow: hidden;
}
.banner-msg {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
  box-shadow: 0 4px 20px rgba(6, 182, 212, 0.2);
}
.banner-text h1 { font-size: 28px; font-weight: 800; margin-bottom: 6px; }
.banner-text p  { font-size: 14px; opacity: .85; }

.msg-tabs { display: flex; gap: 10px; margin-bottom: 24px; }
.tab {
  position: relative; padding: 8px 22px; border-radius: 24px;
  font-size: 13px; font-weight: 500; color: #555; background: #fff;
  border: 1.5px solid var(--color-border); cursor: pointer; transition: all .25s; user-select: none;
}
.tab:hover { border-color: #06b6d4; color: #06b6d4; background: #f0fdff; }
.tab.active {
  background: linear-gradient(135deg, #06b6d4, #22d3ee);
  color: #fff; border-color: transparent;
  box-shadow: 0 4px 14px rgba(6, 182, 212, .35);
}
.badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 20px; height: 20px; font-size: 11px; font-weight: 700;
  background: #ef4444; color: #fff; border-radius: 10px;
  padding: 0 6px; margin-left: 4px; vertical-align: middle;
}

.msg-list { display: flex; flex-direction: column; gap: 10px; }
.msg-card {
  display: flex; align-items: center; gap: 16px;
  background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-lg);
  padding: 18px 20px; cursor: pointer; transition: all .25s; position: relative;
}
.msg-card:hover { background: #fafcff; border-color: #c7d2fe; transform: translateX(4px); }
.msg-card.unread { background: linear-gradient(135deg, #eff6ff, #f5f3ff); border-left: 3px solid var(--color-primary); }

.msg-avatar {
  width: 48px; height: 48px; border-radius: var(--radius);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; font-weight: 700; color: #475569; flex-shrink: 0;
}
.msg-body { flex: 1; min-width: 0; }
.msg-top { display: flex; justify-content: space-between; margin-bottom: 6px; }
.msg-name { font-size: 15px; font-weight: 700; color: var(--color-text); }
.msg-time { font-size: 12px; color: var(--color-text-muted); }
.msg-text {
  font-size: 13px; color: var(--color-text-secondary); line-height: 1.5;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 500px;
}
.unread-dot {
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--color-danger); flex-shrink: 0;
  box-shadow: 0 0 6px rgba(239, 68, 68, .4);
}

/* ── Chat Dialog ── */
.chat-body {
  max-height: 360px; overflow-y: auto; display: flex; flex-direction: column; gap: 14px;
  padding: 8px 0;
}
.chat-bubble {
  max-width: 80%; padding: 12px 16px; border-radius: 14px;
  background: #f1f5f9; align-self: flex-start;
}
.chat-bubble.mine {
  align-self: flex-end; background: linear-gradient(135deg, #eef2ff, #e0e7ff);
}
.bubble-text { font-size: 14px; color: var(--color-text); line-height: 1.5; }
.bubble-time { font-size: 11px; color: var(--color-text-muted); margin-top: 6px; }
.empty-chat { text-align: center; color: #94a3b8; padding: 24px; font-size: 13px; }

.chat-input-row { display: flex; gap: 10px; margin-top: 16px; }
</style>
