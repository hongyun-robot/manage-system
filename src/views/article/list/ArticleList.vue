<template>
  <div>
    <z-table
      :table-head="tableHead"
      :table-data="tableData"
    >
      <template #draft="{ td }">
        <span
          :class="[td.value ? 'bg-rose-500' : 'bg-sky-500']"
          class="text-white py-1.5 px-2.5"
        >
          {{ td.value ? '未发布' : '已发布' }}
        </span>
      </template>
      <template #createAt="{ td }">
        {{ dayjs(td.value).format('YYYY-MM-DD') }}
      </template>
      <template #updateAt="{ td }">
        {{ dayjs(td.value).format('YYYY-MM-DD') }}
      </template>
      <template #classifyData="{ td }">
        <el-tag
          v-for="item in (td.value as ClassifyData[])"
          :key="item.id"
          class="mr-1.5"
        >
          <z-icon
            :icon="item.icon"
            class="align-bottom"
          />
          {{ item.name }}
        </el-tag>
      </template>
      <template #operation="{ td }">
        <el-button
          type="warning"
          link
          @click="modifyHandler(td)"
        >
          修改
        </el-button>
        <el-button
          type="danger"
          link
          @click="deleteHandler(td)"
          >删除
        </el-button>
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
import type { ArticleData } from './config'
import { getArticleByPaging, deleteArticle } from '@/api/article'
import type { ClassifyData, GetArticleByPagingRequest, ArticleByIdRequest } from '@/api/types'
import ZIcon from '@/components/ZIcon.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

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

const deleteArticleData = (id: number) => {
  const params: ArticleByIdRequest = {
    id,
  }
  deleteArticle(params).then(res => {
    if (res.message === 'SUCCESS') {
      ElMessage.success('删除成功')
      getArticle()
    }
  })
}

const handleSizeChange = () => {}
const handleCurrentChange = () => {}

interface td {
  row: ArticleData
}

const modifyHandler = (td: td) => {
  console.log(td)
  router.push({
    path: '/article/add',
    query: {
      id: td.row.id,
    },
  })
}
const deleteHandler = (td: td) => {
  if (td.row.id) {
    deleteArticleData(td.row.id)
  }
}

onMounted(() => {
  getArticle()
})
</script>
<style lang="scss" scoped></style>
