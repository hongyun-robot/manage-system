<template>
  <div class="menu-manage box">
    <div class="operation">
      <el-button-group>
        <el-button
          type="primary"
          plain
          @click="addRootMenu"
        >
          <el-icon size="16">
            <CirclePlus />
          </el-icon>
          <span>添加根节点</span>
        </el-button>
        <el-button type="primary">
          <el-icon size="16">
            <Lock />
          </el-icon>
          <span @click="updateMenuData()">保存</span>
        </el-button>
        <el-button type="primary">
          <el-icon size="16">
            <Refresh />
          </el-icon>
          <span @click="getMenuData()">刷新</span>
        </el-button>
      </el-button-group>
    </div>
    <div class="content">
      <el-tree
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        draggable
        :data="menuData"
        :props="{ label: 'title' }"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-drop="nodeDrop"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>
              <z-icon
                :icon="node.data.icon"
                :size="16"
                class="icon"
              />
              {{ node.label }} -- {{ node.data.icon }}
            </span>
            <span>
              <el-button-group>
                <el-button
                  type="primary"
                  text
                  @click="viewMenu(data)"
                >
                  查看
                </el-button>
                <el-button
                  type="primary"
                  text
                  @click="appendSubMenu(data)"
                >
                  添加
                </el-button>
                <el-button
                  type="warning"
                  text
                  @click="updateSubMenu(data)"
                >
                  修改
                </el-button>
                <el-button
                  type="danger"
                  text
                  @click="remove(node, data)"
                >
                  删除
                </el-button>
              </el-button-group>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
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
        <el-form-item label="顺序">
          <el-input
            disabled
            v-model="form.order"
          />
        </el-form-item>
        <el-form-item label="菜单标题">
          <el-input
            :disabled="dialogType === 'view'"
            v-model="form.title"
          />
        </el-form-item>
        <el-form-item label="图标">
          <el-input
            :disabled="dialogType === 'view'"
            v-model="form.icon"
          />
        </el-form-item>
        <el-form-item label="父节点">
          <el-input
            disabled
            :value="findMenuDataById(form.parentId || -1)?.title"
          />
        </el-form-item>
        <el-form-item label="链接">
          <el-input
            :disabled="dialogType === 'view'"
            v-model="form.url"
          />
        </el-form-item>
        <el-form-item label="禁用">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="form.disabled"
          />
        </el-form-item>
        <el-form-item label="隐藏">
          <el-switch
            :disabled="dialogType === 'view'"
            v-model="form.hide"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button
            v-if="dialogTypeMap[dialogType].btn"
            type="primary"
            @click="operationHandler()"
          >
            {{ dialogTypeMap[dialogType].btn }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import type { DelMenuRequest, menuData, MenuRequest } from '@/api/types'
import { addMenu, delMenu, updateMenu } from '@/api'
import type Node from 'element-plus/es/components/tree/src/model/node'
// import type { AllowDropType } from 'element-plus/es/components/tree/src/tree.type'
import ZIcon from '@/components/ZIcon.vue'
import { useMenuStore } from '@/store/menu'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const flattenMenuData = ref<menuData[]>([])

const menuStore = useMenuStore()
const { getMenuData } = menuStore
const { data: menuData } = storeToRefs(menuStore)

watch(menuData, value => {
  fillChildren(flattenMenuData.value)
  flattenMenuData.value = []
  flattenMenuData.value = flattenDeep(value)
})

// =================== method start ===================
// 将菜单数据打平
const flattenDeep = (data: menuData[]): menuData[] => {
  const menuData: menuData[] = []
  data.forEach(item => {
    menuData.push({ ...item })
    if (item.children && item.children.length > 0) {
      menuData.push(...flattenDeep(item.children))
    }
  })
  return menuData
}

const findMenuDataById = (id: number): menuData | undefined => {
  if (id === -1) return undefined
  return flattenMenuData.value.find(item => item.id === id)
}

const fillChildren = (data: menuData[]) => {
  console.log('fillChildren', data)

  data.forEach(item => {
    if (!item.children) {
      item.children = []
    }
    if (item.children && item.children.length > 0) {
      fillChildren(item.children)
    }
  })
}
// =================== method end ===================

// =================== 按钮组 start ===================
const addRootMenu = () => {
  const menuDataLength = menuData.value.length
  if (menuDataLength <= 0) {
    form.order = 1
  } else {
    form.order = menuData.value[menuDataLength - 1].order + 1
  }
  dialogVisible.value = true
}

// 对 menuData order 改变
const sortMenuData = (data: menuData[]) => {
  data.forEach((item, index) => {
    item.order = index + 1
    if (item.children) {
      sortMenuData(item.children)
    }
  })
}

const updateMenuData = () => {
  sortMenuData(menuData.value)
  const params: MenuRequest = {
    data: menuData.value,
  }
  updateMenu(params).then(res => {
    if (res.code === 200) {
      ElMessage.success('保存成功')
    } else {
      ElMessage.error('保存失败')
    }
  })
}
// =================== 按钮组 end ===================

// =================== dialog start ===================
enum DialogTypeEnum {
  VIEW = 'view',
  APPEND = 'append',
  UPDATE = 'update',
}
interface DialogType {
  id: DialogTypeEnum
  btn: boolean | string
  operation?: () => void
}

const dialogVisible = ref(false)
const dialogType = ref<DialogTypeEnum>(DialogTypeEnum.VIEW)

let form = reactive<menuData>({
  id: undefined,
  parentId: null,
  title: '',
  icon: '',
  order: 1,
  url: '/',
  disabled: 0,
  hide: false,
  children: [],
})

// 重置表单数据
const resetForm = () => {
  form.id = undefined
  form.parentId = null
  form.title = ''
  form.icon = ''
  form.order = 1
  form.url = '/'
  form.disabled = 0
  form.hide = false
  form.children = undefined
}

const handleClose = () => {
  dialogVisible.value = false
}

const operationHandler = () => {
  // if (dialogType.value === DialogTypeEnum.APPEND) {
  //   append()
  // }
  dialogTypeMap[dialogType.value]?.operation?.()
}

// 添加按钮发送请求
const append = () => {
  const params: MenuRequest = {
    data: [form],
  }
  addMenu(params)
    .then(res => {
      if (res.message === 'SUCCESS') {
        getMenuData()
      }
      dialogVisible.value = false
      resetForm()
    })
    .catch(err => {
      dialogVisible.value = false
      resetForm()
      console.log(err)
    })
}

const update = () => {
  const params: MenuRequest = {
    data: [form],
  }
  updateMenu(params)
    .then(res => {
      if (res.message === 'SUCCESS') {
        dialogVisible.value = false
        getMenuData()
        ElMessage.success('修改成功')
      } else {
        ElMessage.error(`修改失败 ${res.message}`)
      }
    })
    .catch(err => {
      ElMessage.error(err)
    })
}

const dialogTypeMap: Record<DialogTypeEnum, DialogType> = {
  [DialogTypeEnum.VIEW]: {
    id: DialogTypeEnum.VIEW,
    btn: false,
  },
  [DialogTypeEnum.APPEND]: {
    id: DialogTypeEnum.APPEND,
    btn: '添加',
    operation: append,
  },
  [DialogTypeEnum.UPDATE]: {
    id: DialogTypeEnum.UPDATE,
    btn: '修改',
    operation: update,
  },
}

// =================== dialog end ===================

// =================== tree start ===================
// const dataSource = ref<menuData[]>([])

// const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
const allowDrop = () => {
  // console.log(draggingNode, dropNode, type)

  return true
}
const allowDrag = (draggingNode: Node) => {
  console.log('allowDragallowDrag', draggingNode)

  return true
}
const nodeDrop = (draggingNode: Node, endNode: Node, dropType: string) => {
  console.log(draggingNode, endNode, dropType)
  const endData = endNode.data
  const draggingData = draggingNode.data
  if (dropType === 'inner') {
    draggingData.parentId = endData.id
  } else {
    draggingData.parentId = endData.parentId
  }
  sortMenuData(menuData.value)
}

// 查看菜单数据
const viewMenu = (data: menuData) => {
  resetForm()
  form = reactive<menuData>(JSON.parse(JSON.stringify(data)))
  dialogType.value = DialogTypeEnum.VIEW
  dialogVisible.value = true
}

// 添加子菜单
const appendSubMenu = (data: menuData) => {
  console.log(data)
  resetForm()
  form.parentId = data.id
  dialogType.value = DialogTypeEnum.APPEND

  dialogVisible.value = true
}

const updateSubMenu = (data: menuData) => {
  resetForm()
  form = reactive<menuData>(JSON.parse(JSON.stringify(data)))
  dialogType.value = DialogTypeEnum.UPDATE
  dialogVisible.value = true
}

// 删除菜单
const remove = (node: Node, data: menuData[]) => {
  console.log(data)

  const id = (node.data as menuData).id
  if (id) {
    const params: DelMenuRequest = {
      id,
    }
    delMenu(params).then(res => {
      console.log(res)
      if (res.message === 'SUCCESS') {
        ElMessage.success('删除成功')
        getMenuData()
      }
    })
  }
}
// =================== tree end ===================
</script>
<style lang="scss" scoped>
.menu-manage {
  .content {
    width: 50%;

    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        vertical-align: bottom;
      }
    }

    :deep(.el-tree) {
      .el-button span {
        transition: all 0.1s;
      }
      .el-button:hover {
        background-color: transparent;
        span {
          padding-bottom: 3px;
        }
        &.el-button--danger span {
          border-bottom: 1px solid var(--el-color-danger);
        }
        &.el-button--warning span {
          border-bottom: 1px solid var(--el-color-warning);
        }
        &.el-button--primary span {
          border-bottom: 1px solid var(--el-color-primary);
        }
      }
    }
  }
}
</style>
