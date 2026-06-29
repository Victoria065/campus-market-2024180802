import http from './http'

export interface GroupBuyItem {
  id: number
  title: string
  type: string
  targetCount: number
  currentCount: number
  deadline: string
  location: string
  organizer: string
  contactInfo: string
  description: string
  status: string
}

export function getGroupBuys(): Promise<GroupBuyItem[]> {
  return http.get('/groupBuys').then((res) => res.data)
}

export function getGroupBuyById(id: number): Promise<GroupBuyItem> {
  return http.get(`/groupBuys/${id}`).then((res) => res.data)
}
