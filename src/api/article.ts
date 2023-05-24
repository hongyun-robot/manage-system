import { del, get, post, put } from '@/utils/http'
import type { ArticleData, GetArticleByPagingRequest, GetArticleRequest } from './types'

// 添加文章，存草稿
export const addArticle = (params: GetArticleRequest) => {
  return post<GetArticleRequest, ArticleData[]>('/article/add', params)
}

// 分页获取文章
export const getArticleByPaging = (params: GetArticleByPagingRequest) => {
  console.log('zzzzzzzzzzzz', params);
  
  return get<GetArticleByPagingRequest, ArticleData[]>('/article/getarticle', params)
}
