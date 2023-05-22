import { del, get, post, put } from '@/utils/http'
import type { DelMenuRequest, MenuRequest, menuData } from './types'

export const getAllMenuData = () => {
  return get<null, menuData[]>('/base/menu/get')
}

export const addMenu = <T = MenuRequest>(params: T) => {
  return post<T, T[]>('/base/menu/add', params)
}

export const delMenu = (params: DelMenuRequest) => {
  return del<DelMenuRequest, null>(`/base/menu/${params.id}`)
}

export const updateMenu = <T = MenuRequest>(params: T) => {
  return put<T, T>('/base/menu/update', params)
}
