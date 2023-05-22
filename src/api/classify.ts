import { del, get, post, put } from '@/utils/http'
import type { ClassifyData, ClassifyRequest, DelRequest } from './types'

// 通过 id 获取分类数据，id === -1 获取全部数据
export const getClassifyData = (id: number) => {
  return get<null, ClassifyData[]>(`/classify/${id}`)
}

export const addClassify = (params: ClassifyData) => {
  return post<ClassifyData, ClassifyData[]>('/classify/add', params)
}

export const updateClassify = (params: ClassifyData) => {
  return put<ClassifyData, ClassifyData[]>(`/classify/${params.id}`, params)
}

export const delClassify = (params: DelRequest) => {
  return del<DelRequest, null>(`/classify/${params.id}`)
}