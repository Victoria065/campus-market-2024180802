import http from './http'

export interface MessageItem {
  id: string
  fromUserId: string
  fromUserName: string
  toUserId: string
  content: string
  time: string
  read: boolean
}

/** 获取全部消息 */
export function getAllMessages(): Promise<MessageItem[]> {
  return http.get('/messages').then((res) => res.data)
}

/** 获取发给某用户的消息 */
export function getMessagesByUser(userId: string): Promise<MessageItem[]> {
  return http.get('/messages', { params: { toUserId: userId } }).then((res) => res.data)
}

/** 发送消息 */
export function sendMessage(data: Omit<MessageItem, 'id'>): Promise<MessageItem> {
  return http.post('/messages', data).then((res) => res.data)
}

/** 标记消息已读 */
export function markAsRead(id: string): Promise<MessageItem> {
  return http.patch(`/messages/${id}`, { read: true } as Partial<MessageItem>).then((res) => res.data)
}
