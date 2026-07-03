import http from './http'

export interface ErrandItem {
  id: number
  title: string
  taskType: string
  reward: number
  pickupLocation: string
  deliveryLocation: string
  deadline: string
  publisher: string
  description: string
  status: string
}

export function getErrands(): Promise<ErrandItem[]> {
  return http.get('/errands').then((res) => res.data)
}

export function getErrandById(id: number): Promise<ErrandItem> {
  return http.get(`/errands/${id}`).then((res) => res.data)
}

export function createErrand(data: Omit<ErrandItem, 'id'>): Promise<ErrandItem> {
  return http.post('/errands', data).then((res) => res.data)
}

export function updateErrand(id: number | string, data: Partial<ErrandItem>): Promise<ErrandItem> {
  return http.patch(`/errands/${id}`, data).then((res) => res.data)
}
