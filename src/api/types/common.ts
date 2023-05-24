export interface Request<T> {
  data: T | T[]
}

// 分页
export interface Paging {
  pageSize: number
  pageNum: number
}