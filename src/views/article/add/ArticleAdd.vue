<template>
  <div class="article">
    <div class="flex justify-between items-center">
      <el-input
        v-model="title"
        placeholder="输入标题"
        clearable
        class="my-3"
      />
      <div class="flex ml-5">
        <el-button
          type="primary"
          plain
          >草稿箱</el-button
        >
        <el-button type="primary">发布</el-button>
      </div>
    </div>

    <MdEditor
      v-model="text"
      @on-save="editorSaveHandler"
    />
  </div>
</template>
<script lang="ts" setup>
import { MdEditor } from 'md-editor-v3'
const text = ref<string>('')
const title = ref<string>('')

const editorSaveHandler = (value: string, html: Promise<string>) => {
  console.log(value)
  html.then(res => {
    console.log('html', res)
  })
}
</script>
<style lang="scss" scoped>
.article {
  height: 100%;
  background-color: var(--el-bg-color);
}
</style>
