import { ClassifyData as ClassifyDataTemp } from "@/api/types";
import { TableHead } from "@/components/table/types";

interface ClassifyData extends ClassifyDataTemp {
  operation?: string
}

export const tableHead: TableHead<ClassifyData>[] = [
  {
    prop: 'id',
    label: 'id'
  },
  {
    prop: 'name',
    label: '名称'
  },
  {
    prop: 'createAt',
    label: '创建时间'
  },
  {
    prop: 'icon',
    label: '图标'
  },
  {
    prop: 'operation',
    label: '操作'
  }
]