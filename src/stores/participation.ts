/** 用户参与记录（加入的拼单、接了的跑腿） — localStorage 持久化，按用户隔离 */

export interface Participation {
  type: 'groupBuy' | 'errand'
  id: number | string
  title: string
  joinedAt: string
}

function getStorageKey(): string {
  try {
    const raw = localStorage.getItem('campus_market_user')
    if (raw) {
      const user = JSON.parse(raw) as { userId?: string }
      if (user.userId) return `campus_market_participations_${user.userId}`
    }
  } catch { /* ignore */ }
  return 'campus_market_participations_anonymous'
}

function loadAll(): Participation[] {
  try {
    const raw = localStorage.getItem(getStorageKey())
    if (raw) return JSON.parse(raw) as Participation[]
  } catch { /* ignore */ }
  return []
}

function saveAll(items: Participation[]) {
  localStorage.setItem(getStorageKey(), JSON.stringify(items))
}

export function getParticipations(): Participation[] {
  return loadAll()
}

export function addParticipation(type: 'groupBuy' | 'errand', id: number | string, title: string) {
  const items = loadAll()
  if (items.some((p) => p.type === type && p.id === id)) return false
  items.push({ type, id, title, joinedAt: new Date().toLocaleString('zh-CN', { hour12: false }) })
  saveAll(items)
  return true
}

export function hasParticipation(type: 'groupBuy' | 'errand', id: number | string): boolean {
  return loadAll().some((p) => p.type === type && p.id === id)
}
