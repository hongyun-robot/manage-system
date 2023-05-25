import { del, get, post, put } from '@/utils/http'
import type { ArticleData, ArticleByIdRequest, GetArticleByPagingRequest, AddArticleRequest, UpdateArticleRequest } from './types'

// 添加文章，存草稿
export const addArticle = (params: AddArticleRequest) => {
  return post<AddArticleRequest, ArticleData[]>('/article/add', params)
}

// 分页获取文章
export const getArticleByPaging = (params: GetArticleByPagingRequest) => {
  return get<GetArticleByPagingRequest, ArticleData[]>('/article/getarticle', params)
}

// 根据 id 获取文章
export const getArticleById = (params: ArticleByIdRequest) => {
  return get<ArticleByIdRequest, ArticleData[]>(`/article/${params.id}`, params)
}

// 根据 id 获取文章
export const updateArticle = (params: UpdateArticleRequest) => {
  return put<UpdateArticleRequest, ArticleData[]>(`/article/${params.id}`, params)
}

// 根据 id 获取文章
export const deleteArticle = (params: ArticleByIdRequest) => {
  return del<ArticleByIdRequest, null>(`/article/${params.id}`)
}
