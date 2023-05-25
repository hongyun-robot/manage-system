<template>
  <div class="article">
    <div class="flex justify-between items-center">
      <el-input
        v-model="title"
        placeholder="输入标题"
        clearable
        class="my-3"
      />
      <div>
        <el-select
          v-model="classify"
          multiple
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in classifyData"
            :key="item.id"
            :label="item.name"
            :value="(item.id as number)"
          />
        </el-select>
      </div>
      <div class="flex ml-5">
        <el-button
          type="primary"
          plain
          @click="updateArticleHandler(true)"
        >
          草稿箱
        </el-button>
        <el-button
          type="primary"
          @click="updateArticleHandler(false)"
          >发布</el-button
        >
      </div>
    </div>

    <MdEditor
      v-model="text"
      @on-save="editorSaveHandler"
    />
  </div>
</template>
<script lang="ts" setup>
import { addArticle, getArticleById, updateArticle } from '@/api/article'
import { getClassifyData } from '@/api/classify'
import type { AddArticleRequest, ClassifyData, ArticleByIdRequest, UpdateArticleRequest } from '@/api/types'
import { ElMessage } from 'element-plus'
import { MdEditor } from 'md-editor-v3'
import { useRoute } from 'vue-router'
interface Query {
  id?: number
}
const { query }: { query: Query } = useRoute()

const text = ref<string>('')
const title = ref<string>('')
const classifyData = ref<ClassifyData[]>([])
const classify = ref<number[]>([])
const isAdd: boolean = !Boolean(query.id)

const editorSaveHandler = (value: string, html: Promise<string>) => {
  console.log(value)
  html.then(res => {
    console.log('html', res)
  })
}

const getClassify = () => {
  getClassifyData(-1).then(res => {
    if (res.message === 'SUCCESS') {
      classifyData.value = res.data
    }
  })
}

const getArticle = () => {
  if (!isAdd) {
    const params: ArticleByIdRequest = {
      id: query.id as number,
    }
    getArticleById(params).then(res => {
      if (res.message === 'SUCCESS') {
        const data = res.data[0]
        title.value = data.title
        text.value = data.content
        classify.value = data.classifyData.map(item => item.id as number)
      }
    })
  }
}

const updateArticleData = (draft: boolean) => {
  const params: UpdateArticleRequest = {
    id: query.id,
    title: title.value,
    content: text.value,
    draft,
    status: 0,
    classifyIds: classify.value
  }
  updateArticle(params).then(res => {
    if (res.message === 'SUCCESS') {
      getArticle()
      ElMessage.success('修改成功')
    }
  })
}

const addArticleData = (draft: boolean) => {
  const params: AddArticleRequest = {
    title: title.value,
    content: text.value,
    draft,
    status: 0,
    classifyIds: classify.value
  }
  addArticle(params).then(res => {
    if (res.message === 'SUCCESS') {
      ElMessage.success('添加成功')
    }
  })
}

onMounted(() => {
  getArticle()
  getClassify()
})

const updateArticleHandler = (isDraft: boolean) => {
  if (isAdd) {
    addArticleData(isDraft)
  } else {
    updateArticleData(isDraft)
  }
}
</script>
<style lang="scss" scoped>
.article {
  height: 100%;
  background-color: var(--el-bg-color);
}
</style>
