<template>
  <el-table :data="tableData" v-bind="attrs">
    <el-table-column
      v-for="item in tableHead"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      v-bind="columnAttrs"
    >
      <template #default="scope">
        <slot
          :name="item.prop"
          :td="{
            row: scope.row,
            column: scope.column,
            value: scope.row[scope.column.property],
            $index: scope.$index,
          }"
        >
          {{ scope.row[scope.column.property] }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup generic="T">
// import type { ElTable, ElTableColumn } from 'element-plus'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { TableProps } from 'element-plus/es/components/table/src/table/defaults'
import { TableHead } from './types'

interface Props {
  tableData: T[]
  tableHead: TableHead[]
  attrs?: TableProps<T>
  columnAttrs?: TableColumnCtx<T>
}
defineProps<Props>()
</script>
<style lang="scss" scoped></style>
