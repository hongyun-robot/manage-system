import type { Request } from '@/api/types'

export interface ClassifyData {
  id?: number
  name: string
  createAt?: number
  updateAt?: number
  icon: string
  articleIds?: number[]
}

export type ClassifyRequest = Request<ClassifyData>

export interface DelRequest {
  id: number
}