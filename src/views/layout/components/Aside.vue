<template>
  <div class="aside">
    <z-menu :data="menuData" />
  </div>
</template>
<script lang="ts" setup>
import ZMenu from '@/components/menu/ZMenu.vue'
import { useMenuStore } from '@/store/menu'
import { storeToRefs } from 'pinia'

const menuStore = useMenuStore()
// const { getMenuData } = menuStore
const { data: menuData } = storeToRefs(menuStore)

// onMounted(() => {
//   getMenuData()
// })
</script>
<style lang="scss" scoped>
.aside {
  background-color: var(--el-color-primary-light-3);
  height: 100%;
  overflow-y: auto;

  .el-menu-vertical-demo {
    --el-menu-bg-color: var(--el-color-primary-light-3);
    --el-menu-hover-bg-color: var(--el-color-primary);
    --el-menu-active-color: #303133;
    // max-height: calc(100% - 70px);
    // overflow-y: hidden;

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
}
</style>
