import http from './http'

export interface UserInfo {
  id: string
  username: string
  studentId: string
  password: string
  college: string
  grade: string
  avatar: string
  registerTime: string
}

/** 获取全部用户 */
export function getAllUsers(): Promise<UserInfo[]> {
  return http.get('/users').then((res) => res.data)
}

/** 按学号查找用户（客户端过滤，兼容 json-server 版本差异） */
export async function getUserByStudentId(studentId: string): Promise<UserInfo | undefined> {
  const all = await getAllUsers()
  return all.find((u) => u.studentId === studentId)
}

/** 注册新用户 */
export function createUser(data: Omit<UserInfo, 'id'>): Promise<UserInfo> {
  return http.post('/users', data).then((res) => res.data)
}

/** 更新用户资料 */
export function updateUser(id: string, data: Partial<UserInfo>): Promise<UserInfo> {
  return http.patch(`/users/${id}`, data).then((res) => res.data)
}
