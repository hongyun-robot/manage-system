<template>
  <div>
    <z-table
      :table-head="tableHead"
      :table-data="tableData"
    >
      <template #status="{ td }">
        <span :class="[ td.value === 0 ? 'text-rose-500' : 'text-sky-500' ]">
          {{ td.value === 0 ? '未发布' : '已发布' }}
        </span>
      </template>
      <template #createAt="{ td }">
        {{ dayjs(td.value).format('YYYY-MM-DD') }}
      </template>
      <template #updateAt="{ td }">
        {{ dayjs(td.value).format('YYYY-MM-DD') }}
      </template>
      <template #classifyData="{ td }">
        <span
          v-for="item in (td.value as ClassifyData[])"
          :key="item.id"
        >
          <z-icon :icon="item.icon" class="align-middle" />
          {{ item.name }}
        </span>
        <!-- {{ (td.value as ClassifyData[]).map(item => item.name).join(',') }} -->
      </template>
    </z-table>
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      class="mt-10"
      :page-sizes="[10, 20, 30, 40]"
      :background="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import ZTable from '@/components/table/ZTable.vue'
import * as dayjs from 'dayjs'
import { tableHead } from './config'
import { getArticleByPaging } from '@/api/article'
import type { ArticleData, ClassifyData, GetArticleByPagingRequest } from '@/api/types'
import ZIcon from '@/components/ZIcon.vue'

const tableData = ref<ArticleData[]>([])
const pageNum = ref<number>(1)
const pageSize = ref<number>(10)

const getArticle = () => {
  const params: GetArticleByPagingRequest = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  }
  getArticleByPaging(params).then(res => {
    if (res.code === 200) {
      tableData.value = res.data
    }
  })
}

const handleSizeChange = () => {}
const handleCurrentChange = () => {}

onMounted(() => {
  getArticle()
})
</script>
<style lang="scss" scoped></style>
