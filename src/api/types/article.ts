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

export interface GetArticleRequest extends ArticleDataTemp {
  classifyData: number[]
}

export interface GetArticleByPagingRequest extends Paging {
  draft?: boolean
}