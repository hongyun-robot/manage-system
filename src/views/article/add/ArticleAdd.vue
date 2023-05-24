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
          @click="draftHandler"
        >
          草稿箱
        </el-button>
        <el-button type="primary" @click="releaseHandler">发布</el-button>
      </div>
    </div>

    <MdEditor
      v-model="text"
      @on-save="editorSaveHandler"
    />
  </div>
</template>
<script lang="ts" setup>
import { addArticle } from '@/api/article'
import { getClassifyData } from '@/api/classify'
import { GetArticleRequest, ClassifyData } from '@/api/types'
import { MdEditor } from 'md-editor-v3'

const text = ref<string>('')
const title = ref<string>('')
const classifyData = ref<ClassifyData[]>([])
const classify = ref<number[]>([])

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

onMounted(() => {
  getClassify()
})

const draftHandler = () => {
  const params: GetArticleRequest = {
    title: title.value,
    content: text.value,
    draft: true,
    status: 0,
    classifyData: classify.value,
  }
  addArticle(params).then(res => {
    console.log(res)
  })
}
const releaseHandler = () => {
  const params: GetArticleRequest = {
    title: title.value,
    content: text.value,
    draft: false,
    status: 1,
    classifyData: classify.value,
  }
  addArticle(params).then(res => {
    console.log(res)
  })
}
</script>
<style lang="scss" scoped>
.article {
  height: 100%;
  background-color: var(--el-bg-color);
}
</style>
