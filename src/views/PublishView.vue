<template>
  <main class="page">
    <!-- Banner -->
    <div class="page-banner banner-publish">
      <div class="banner-text">
        <h1>📝 发布信息</h1>
        <p>选择你要发布的内容类型，让更多同学看到</p>
      </div>
    </div>

    <!-- Type Selector -->
    <section class="type-section">
      <h2 class="section-title">选择发布类型</h2>
      <div class="type-cards">
        <div
          v-for="t in publishTypes"
          :key="t.value"
          class="type-card"
          :class="{ active: currentType === t.value }"
          @click="selectType(t.value)"
        >
          <span class="type-icon">{{ t.icon }}</span>
          <div class="type-info">
            <span class="type-label">{{ t.label }}</span>
            <span class="type-desc">{{ t.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Publish Form -->
    <section v-if="currentType" class="form-section">
      <h2 class="section-title">填写{{ typeLabel }}信息</h2>

      <form class="publish-form" @submit.prevent="handleSubmit">
        <!-- ============ 通用字段 ============ -->
        <FormField label="标题" :required="true" :error="errors.title">
          <el-input
            v-model="form.title"
            placeholder="请输入标题"
            maxlength="60"
            show-word-limit
            clearable
          />
        </FormField>

        <!-- ============ 二手交易专属字段 ============ -->
        <template v-if="currentType === 'trade'">
          <div class="field-row">
            <FormField label="分类" :required="true" :error="errors.category">
              <el-select v-model="form.category" placeholder="请选择分类" clearable>
                <el-option
                  v-for="c in tradeCategories"
                  :key="c"
                  :label="c"
                  :value="c"
                />
              </el-select>
            </FormField>
            <FormField label="价格 (元)" :required="true" :error="errors.price">
              <el-input-number
                v-model="form.price"
                :min="0"
                :precision="2"
                :controls="false"
                placeholder="0.00"
              />
            </FormField>
          </div>
          <div class="field-row">
            <FormField label="成色" :required="true" :error="errors.condition">
              <el-select v-model="form.condition" placeholder="请选择成色" clearable>
                <el-option
                  v-for="c in conditions"
                  :key="c"
                  :label="c"
                  :value="c"
                />
              </el-select>
            </FormField>
            <FormField label="地点" :required="true" :error="errors.location">
              <el-input v-model="form.location" placeholder="例如：博学楼" clearable />
            </FormField>
          </div>
        </template>

        <!-- ============ 失物招领专属字段 ============ -->
        <template v-if="currentType === 'lostFound'">
          <div class="field-row">
            <FormField label="类型" :required="true" :error="errors.lfType">
              <el-select v-model="form.lfType" placeholder="请选择类型" clearable>
                <el-option label="寻物启事" value="lost" />
                <el-option label="失物招领" value="found" />
              </el-select>
            </FormField>
            <FormField label="分类" :required="true" :error="errors.category">
              <el-select v-model="form.category" placeholder="请选择分类" clearable>
                <el-option
                  v-for="c in lfCategories"
                  :key="c"
                  :label="c"
                  :value="c"
                />
              </el-select>
            </FormField>
          </div>
          <div class="field-row">
            <FormField label="地点" :required="true" :error="errors.location">
              <el-input v-model="form.location" placeholder="例如：博学楼 301 教室" clearable />
            </FormField>
            <FormField label="时间" :required="true" :error="errors.lfDate">
              <el-date-picker
                v-model="form.lfDate"
                type="date"
                placeholder="选择日期"
                value-format="YYYY-MM-DD"
              />
            </FormField>
          </div>
        </template>

        <!-- ============ 拼单搭子专属字段 ============ -->
        <template v-if="currentType === 'groupBuy'">
          <div class="field-row">
            <FormField label="拼单类型" :required="true" :error="errors.gbType">
              <el-select v-model="form.gbType" placeholder="请选择类型" clearable>
                <el-option
                  v-for="t in gbTypes"
                  :key="t"
                  :label="t"
                  :value="t"
                />
              </el-select>
            </FormField>
            <FormField label="目标人数" :required="true" :error="errors.targetCount">
              <el-input-number
                v-model="form.targetCount"
                :min="2"
                :max="100"
                :controls="false"
                placeholder="2"
              />
            </FormField>
          </div>
          <div class="field-row">
            <FormField label="地点" :required="true" :error="errors.location">
              <el-input v-model="form.location" placeholder="例如：图书馆自习室" clearable />
            </FormField>
            <FormField label="截止时间" :required="true" :error="errors.deadline">
              <el-date-picker
                v-model="form.deadline"
                type="datetime"
                placeholder="选择截止时间"
                value-format="YYYY-MM-DD HH:mm"
              />
            </FormField>
          </div>
        </template>

        <!-- ============ 跑腿委托专属字段 ============ -->
        <template v-if="currentType === 'errand'">
          <div class="field-row">
            <FormField label="任务类型" :required="true" :error="errors.taskType">
              <el-select v-model="form.taskType" placeholder="请选择任务类型" clearable>
                <el-option
                  v-for="t in errandTaskTypes"
                  :key="t"
                  :label="t"
                  :value="t"
                />
              </el-select>
            </FormField>
            <FormField label="酬劳 (元)" :required="true" :error="errors.reward">
              <el-input-number
                v-model="form.reward"
                :min="0"
                :precision="2"
                :controls="false"
                placeholder="0.00"
              />
            </FormField>
          </div>
          <div class="field-row">
            <FormField label="取件地点" :required="true" :error="errors.pickupLocation">
              <el-input v-model="form.pickupLocation" placeholder="例如：菜鸟驿站（北区）" clearable />
            </FormField>
            <FormField label="送达地点" :required="true" :error="errors.deliveryLocation">
              <el-input v-model="form.deliveryLocation" placeholder="例如：明德楼宿舍" clearable />
            </FormField>
          </div>
          <div class="field-row">
            <FormField label="截止时间" :required="true" :error="errors.deadline">
              <el-date-picker
                v-model="form.deadline"
                type="datetime"
                placeholder="选择截止时间"
                value-format="YYYY-MM-DD HH:mm"
              />
            </FormField>
          </div>
        </template>

        <!-- ============ 通用：描述 ============ -->
        <FormField label="描述" :required="true" :error="errors.description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="4"
            placeholder="请详细描述你的需求或物品信息…"
            maxlength="500"
            show-word-limit
          />
        </FormField>

        <!-- ============ 按钮区 ============ -->
        <div class="form-actions">
          <el-button type="primary" size="large" native-type="submit" :loading="submitting">
            📤 发布
          </el-button>
          <el-button size="large" @click="resetForm">🔄 重置</el-button>
        </div>
      </form>
    </section>

    <!-- 未选择类型时的占位提示 -->
    <section v-else class="empty-hint">
      <p>👆 请先选择上方的一种发布类型</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import FormField from '@/components/FormField.vue'
import { createTrade } from '@/api/trade'
import { createLostFound } from '@/api/lostFound'
import { createGroupBuy } from '@/api/groupBuy'
import { createErrand } from '@/api/errand'

const router = useRouter()

// ==================== 发布类型定义 ====================
const publishTypes = [
  { value: 'trade', label: '二手商品', desc: '发布闲置物品出售', icon: '🛒' },
  { value: 'lostFound', label: '失物 / 招领', desc: '寻找失物或发布招领', icon: '🔍' },
  { value: 'groupBuy', label: '拼单 / 搭子', desc: '找人拼单或组队', icon: '👥' },
  { value: 'errand', label: '跑腿委托', desc: '发布跑腿代办任务', icon: '🏃' },
] as const

// ==================== 选项数据 ====================
const tradeCategories = ['教材教辅', '电子产品', '生活用品']
const conditions = ['几乎全新', '有使用痕迹', '明显磨损']
const lfCategories = ['学习用品', '电子产品', '证件卡片', '生活用品', '箱包']
const gbTypes = ['外卖拼单', '学习搭子', '运动组队', '兴趣小组']
const errandTaskTypes = ['代取快递', '代买物品', '代办事务', '代送文件']

// ==================== 当前类型 ====================
const currentType = ref('')

const typeLabel = computed(() => {
  const found = publishTypes.find((t) => t.value === currentType.value)
  return found ? found.label : ''
})

// ==================== 表单数据 ====================
interface PublishForm {
  title: string
  description: string
  // 二手交易
  category: string
  price: number | undefined
  condition: string
  location: string
  // 失物招领
  lfType: string
  lfDate: string
  // 拼单搭子
  gbType: string
  targetCount: number | undefined
  deadline: string
  // 跑腿委托
  taskType: string
  reward: number | undefined
  pickupLocation: string
  deliveryLocation: string
}

// 固定发布人信息（Day5 将接入 Pinia 用户状态）
const DEFAULT_PUBLISHER = '我'
const DEFAULT_CONTACT = '微信/QQ 联系'

const emptyForm = (): PublishForm => ({
  title: '',
  description: '',
  category: '',
  price: undefined,
  condition: '',
  location: '',
  lfType: '',
  lfDate: '',
  gbType: '',
  targetCount: undefined,
  deadline: '',
  taskType: '',
  reward: undefined,
  pickupLocation: '',
  deliveryLocation: '',
})

const form = reactive<PublishForm>(emptyForm())
const errors = reactive<Record<string, string>>({})
const submitting = ref(false)

// ==================== 类型切换 ====================
function selectType(type: string) {
  if (currentType.value !== type) {
    resetForm()
    currentType.value = type
  }
}

// ==================== 表单校验 ====================
function validate(): boolean {
  // 清空之前的错误
  Object.keys(errors).forEach((k) => delete errors[k])

  let valid = true

  // 通用：标题
  if (!form.title.trim()) {
    errors.title = '请输入标题'
    valid = false
  }

  if (currentType.value === 'trade') {
    if (!form.category) {
      errors.category = '请选择分类'
      valid = false
    }
    if (form.price === undefined || form.price === null) {
      errors.price = '请输入价格'
      valid = false
    } else if (form.price < 0) {
      errors.price = '价格不能为负数'
      valid = false
    }
    if (!form.condition) {
      errors.condition = '请选择成色'
      valid = false
    }
    if (!form.location.trim()) {
      errors.location = '请输入地点'
      valid = false
    }
  }

  if (currentType.value === 'lostFound') {
    if (!form.lfType) {
      errors.lfType = '请选择类型（寻物/招领）'
      valid = false
    }
    if (!form.category) {
      errors.category = '请选择分类'
      valid = false
    }
    if (!form.location.trim()) {
      errors.location = '请输入地点'
      valid = false
    }
    if (!form.lfDate) {
      errors.lfDate = '请选择时间'
      valid = false
    }
  }

  if (currentType.value === 'groupBuy') {
    if (!form.gbType) {
      errors.gbType = '请选择拼单类型'
      valid = false
    }
    if (form.targetCount === undefined || form.targetCount === null) {
      errors.targetCount = '请输入目标人数'
      valid = false
    } else if (form.targetCount < 2) {
      errors.targetCount = '目标人数至少为 2'
      valid = false
    }
    if (!form.location.trim()) {
      errors.location = '请输入地点'
      valid = false
    }
    if (!form.deadline) {
      errors.deadline = '请选择截止时间'
      valid = false
    }
  }

  if (currentType.value === 'errand') {
    if (!form.taskType) {
      errors.taskType = '请选择任务类型'
      valid = false
    }
    if (form.reward === undefined || form.reward === null) {
      errors.reward = '请输入酬劳'
      valid = false
    } else if (form.reward < 0) {
      errors.reward = '酬劳不能为负数'
      valid = false
    }
    if (!form.pickupLocation.trim()) {
      errors.pickupLocation = '请输入取件地点'
      valid = false
    }
    if (!form.deliveryLocation.trim()) {
      errors.deliveryLocation = '请输入送达地点'
      valid = false
    }
    if (!form.deadline) {
      errors.deadline = '请选择截止时间'
      valid = false
    }
  }

  // 通用：描述
  if (!form.description.trim()) {
    errors.description = '请输入描述'
    valid = false
  }

  return valid
}

// ==================== 数据提交 ====================
async function handleSubmit() {
  if (!validate()) {
    ElMessage.warning('请检查表单中的错误信息')
    return
  }

  submitting.value = true

  try {
    if (currentType.value === 'trade') {
      await createTrade({
        title: form.title.trim(),
        price: form.price!,
        category: form.category,
        condition: form.condition,
        seller: DEFAULT_PUBLISHER,
        publishTime: new Date().toLocaleString('zh-CN', { hour12: false }),
        location: form.location.trim(),
        image: '',
        description: form.description.trim(),
        status: 'selling',
      })
      ElMessage.success('二手商品发布成功！')
      router.push('/trade')
    } else if (currentType.value === 'lostFound') {
      await createLostFound({
        type: form.lfType as 'lost' | 'found',
        itemName: form.title.trim(),
        category: form.category,
        location: form.location.trim(),
        date: form.lfDate,
        contactName: DEFAULT_PUBLISHER,
        contactPhone: DEFAULT_CONTACT,
        description: form.description.trim(),
        status: 'open',
      })
      ElMessage.success('失物招领信息发布成功！')
      router.push('/lost-found')
    } else if (currentType.value === 'groupBuy') {
      await createGroupBuy({
        title: form.title.trim(),
        type: form.gbType,
        targetCount: form.targetCount!,
        currentCount: 0,
        deadline: form.deadline,
        location: form.location.trim(),
        organizer: DEFAULT_PUBLISHER,
        contactInfo: DEFAULT_CONTACT,
        description: form.description.trim(),
        status: 'recruiting',
      })
      ElMessage.success('拼单搭子发布成功！')
      router.push('/group-buy')
    } else if (currentType.value === 'errand') {
      await createErrand({
        title: form.title.trim(),
        taskType: form.taskType,
        reward: form.reward!,
        pickupLocation: form.pickupLocation.trim(),
        deliveryLocation: form.deliveryLocation.trim(),
        deadline: form.deadline,
        publisher: DEFAULT_PUBLISHER,
        description: form.description.trim(),
        status: 'open',
      })
      ElMessage.success('跑腿委托发布成功！')
      router.push('/errand')
    }
  } catch (err) {
    console.error('发布失败:', err)
    ElMessage.error('发布失败，请检查 Mock 服务是否已启动 (pnpm mock)')
  } finally {
    submitting.value = false
  }
}

// ==================== 表单重置 ====================
function resetForm() {
  Object.assign(form, emptyForm())
  Object.keys(errors).forEach((k) => delete errors[k])
}
</script>

<style scoped>
.page { padding: 0; }

/* ---- Banner ---- */
.page-banner {
  border-radius: 16px; padding: 36px 32px; margin-bottom: 28px; color: #fff;
  position: relative; overflow: hidden;
}
.banner-publish {
  background: linear-gradient(135deg, #f56c6c, #e63946);
  box-shadow: 0 4px 20px rgba(245, 108, 108, 0.2);
}
.banner-text h1 { font-size: 28px; font-weight: 800; margin-bottom: 6px; }
.banner-text p  { font-size: 14px; opacity: .85; }

/* ---- Section ---- */
.section-title {
  font-size: 18px; font-weight: 700; color: #1f2937;
  margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
}

/* ---- Type Cards ---- */
.type-section { margin-bottom: 32px; }

.type-cards {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
}

.type-card {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  background: #fff; border: 2px solid #f0f0f0; border-radius: 16px;
  padding: 24px 14px; cursor: pointer; transition: all .3s ease; text-align: center;
}
.type-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, .09);
}
.type-card.active {
  border-color: #409eff;
  background: linear-gradient(135deg, #ecf5ff, #dceaff);
  box-shadow: 0 6px 20px rgba(64, 158, 255, .18);
  transform: translateY(-2px);
}

.type-icon { font-size: 36px; transition: transform .3s; }
.type-card:hover .type-icon { transform: scale(1.12); }
.type-card.active .type-icon { transform: scale(1.08); }

.type-label { font-size: 15px; font-weight: 700; color: #222; }
.type-desc  { font-size: 12px; color: #999; }
.type-info  { display: flex; flex-direction: column; gap: 2px; }

/* ---- Form ---- */
.form-section {
  background: #fff; border: 1px solid #f0f0f0; border-radius: 16px;
  padding: 32px; box-shadow: 0 2px 12px rgba(0,0,0,.03);
}

.publish-form { display: flex; flex-direction: column; gap: 22px; }

.field-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 22px;
}

.form-actions {
  display: flex; gap: 14px; padding-top: 12px;
}

.form-actions :deep(.el-button--large) {
  padding: 12px 32px; font-size: 15px; font-weight: 600;
  border-radius: 12px; letter-spacing: 1px;
}

/* ---- Empty Hint ---- */
.empty-hint {
  text-align: center; padding: 80px 0; color: #bbb; font-size: 16px;
  background: #fff; border-radius: 16px; border: 2px dashed #e8e8e8;
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .type-cards { grid-template-columns: repeat(2, 1fr); }
  .field-row { grid-template-columns: 1fr; }
  .form-section { padding: 20px; }
}
</style>
