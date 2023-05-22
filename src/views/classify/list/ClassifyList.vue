<template>
  <div>
    <el-button-group>
      <el-button
        type="primary"
        plain
        @click="addClassifyHandler"
      >
        <el-icon size="16">
          <CirclePlus />
        </el-icon>
        <span>添加</span>
      </el-button>
      <el-button type="primary">
        <el-icon size="16">
          <Refresh />
        </el-icon>
        <span @click="getClassifyListData()">刷新</span>
      </el-button>
    </el-button-group>
    <!-- 表格 -->
    <z-table
      :table-data="tableData"
      :table-head="tableHead"
    >
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
    <!-- dialog -->
    <el-dialog
      v-model="dialogVisible"
      title="添加菜单"
      width="40%"
      :before-close="handleClose"
    >
      <el-form
        :model="form"
        label-width="120px"
      >
        <el-form-item label="ID">
          <el-input
            disabled
            v-model="form.id"
          />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" />
        </el-form-item>
        <el-form-item label="文章列表">
          <el-input
            disabled
            :model-value="form.articleIds?.join(',')"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button
            type="primary"
            @click="dialogSaveHandler"
          >
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import ZTable from '@/components/table/ZTable.vue'
import { tableHead } from './config'
import { getClassifyData, addClassify, updateClassify, delClassify } from '@/api/classify'
import type { ClassifyData } from '@/api/types'
import { ElMessage } from 'element-plus'

type TableData = ClassifyData

const tableData = ref<TableData[]>([])
const dialogVisible = ref<boolean>(false)
let form = reactive<ClassifyData>({
  id: undefined,
  icon: '',
  name: '',
  articleIds: [],
})

const resetForm = () => {
  form.articleIds = []
  form.createAt = undefined
  form.icon = ''
  form.id = undefined
  form.name = ''
  form.updateAt = undefined
}

const getClassifyListData = () => {
  getClassifyData(-1).then(res => {
    if (res.message === 'SUCCESS') {
      tableData.value = res.data
    }
  })
}

const addClassifyData = () => {
  addClassify(form).then(res => {
    if (res.message === 'success') {
      console.log(res.data)
      getClassifyListData()
      ElMessage.success('添加成功')
      dialogVisible.value = false
    }
  })
}

const updateClassifyData = () => {
  updateClassify(form).then(res => {
    if (res.message === 'SUCCESS') {
      console.log(res.data)
      getClassifyListData()
      ElMessage.success('更新成功')
      dialogVisible.value = false
    }
  })
}

const delClassifyData = () => {
  if (form.id) {
    delClassify({ id: form.id }).then(res => {
      if (res.message === 'SUCCESS') {
        console.log(res.data)
        getClassifyListData()
        ElMessage.success('删除成功')
        dialogVisible.value = false
      }
    })
  }
}

const addClassifyHandler = () => {
  resetForm()
  dialogVisible.value = true
}
interface td {
  row: ClassifyData
}
const modifyHandler = (td: td) => {
  resetForm()
  const { row } = td
  form = reactive({...row})
  form.articleIds = form.articleIds || []
  dialogVisible.value = true
}
const deleteHandler = (td: td) => {
  const { row } = td
  if (row.id) {
    form = reactive(row)
    delClassifyData()
  }
}

const handleClose = () => {
  dialogVisible.value = false
}
const dialogSaveHandler = () => {
  if (form.id) {
    updateClassifyData()
  } else {
    addClassifyData()
  }
}

onMounted(() => {
  getClassifyListData()
})
</script>
<style lang="scss" scoped></style>
