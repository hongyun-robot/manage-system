import type { Request } from '@/api/types'

export interface menuData {
  id?: number
  parentId?: number | null
  order: number
  title: string
  icon: string
  url: string
  disabled: number
  hide: boolean
  children?: menuData[] | null
}

export type MenuRequest = Request<menuData> 
export type UpdateMenuRequest = Request<menuData[]> 

export interface DelMenuRequest {
  id: number
}