import type { ArticleData as ArticleDataTemp } from "@/api/types";
import { TableHead } from "@/components/table/types";

// interface TableHead {
//   prop: keyof ArticleData
//   label: string
// }

export interface ArticleData extends ArticleDataTemp {
  operation?: any
}

export const tableHead: TableHead<ArticleData>[] = [
  {
    prop: 'title',
    label: '标题'
  },
  {
    prop: 'createAt',
    label: '创建时间'
  },
  {
    prop: 'updateAt',
    label: '更新时间'
  },
  {
    prop: 'draft',
    label: '状态'
  },
  {
    prop: 'classifyData',
    label: '所属分类'
  },
  {
    prop: 'operation',
    label: '操作'
  }
]