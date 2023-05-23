import { del, get, post, put } from '@/utils/http'
import type { ArticleData } from './types'

// 添加文章，存草稿
export const addArticle = (params: ArticleData) => {
  return post<ArticleData, ArticleData[]>('/article/add', params)
}