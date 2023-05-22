<template>
  <el-menu
    class="z-menu"
    text-color="#fff"
    v-bind="$attrs"
  >
    <z-sub-menu
      v-for="item in data"
      :key="item.id"
      :sub-data="item"
    />
  </el-menu>
</template>
<script lang="ts" setup>
import { menuData } from '@/api/types'
import ZSubMenu from './ZSubMenu.vue'

const { data } = defineProps<{
  data: menuData[]
}>()
</script>
<style lang="scss" scoped>
.z-menu {
  --el-menu-bg-color: var(--el-color-primary-light-3);
  --el-menu-hover-bg-color: var(--el-color-primary);
  --el-menu-active-color: #303133;

  :deep(.el-menu) {
    .el-menu-item.is-active {
      background-color: var(--el-color-primary);
    }

    .el-menu-item-group {
      .el-menu-item-group__title {
        --el-text-color-secondary: var(--el-color-white);
      }
    }
  }
}
</style>
