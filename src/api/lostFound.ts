import http from './http'

export interface LostFoundItem {
  id: number
  type: 'lost' | 'found'
  itemName: string
  category: string
  location: string
  date: string
  contactName: string
  contactPhone: string
  description: string
  status: string
}

export function getLostFounds(): Promise<LostFoundItem[]> {
  return http.get('/lostFounds').then((res) => res.data)
}

export function getLostFoundById(id: number): Promise<LostFoundItem> {
  return http.get(`/lostFounds/${id}`).then((res) => res.data)
}
