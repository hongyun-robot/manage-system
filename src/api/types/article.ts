import { ClassifyData, Paging } from "."

export interface ArticleData {
  id?: number
  title: string
  content: string
  status: number
  draft: boolean
  createAt?: number
  updateAt?: number
  classifyData: ClassifyData[]
}

type ArticleDataTemp = Omit<ArticleData, 'classifyData'>

export interface AddArticleRequest extends ArticleDataTemp {
  classifyIds: number[]
}

export interface UpdateArticleRequest extends ArticleDataTemp {
  classifyIds: number[]
}

export interface GetArticleByPagingRequest extends Paging {
  draft?: boolean
}

export interface ArticleByIdRequest {
  id: number
}