import http from './http'

export interface TradeItem {
  id: number
  title: string
  price: number
  category: string
  condition: string
  seller: string
  publishTime: string
  location: string
  image: string
  description: string
  status: string
}

export function getTrades(): Promise<TradeItem[]> {
  return http.get('/trades').then((res) => res.data)
}

export function getTradeById(id: number): Promise<TradeItem> {
  return http.get(`/trades/${id}`).then((res) => res.data)
}
