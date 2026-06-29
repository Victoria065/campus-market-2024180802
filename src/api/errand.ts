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
