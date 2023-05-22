<template>
  <el-sub-menu
    v-if="subData.children"
    :index="`${subData.id}`"
  >
    <template #title>
      <z-icon :icon="subData.icon" />
      <span>
        {{ subData.title }}
      </span>
    </template>
    <z-sub-menu
      v-for="item in subData.children"
      :key="item.id"
      :sub-data="item"
    />
  </el-sub-menu>
  <el-menu-item
    v-else-if="!subData.hide"
    :index="`${subData.id}`"
    :disabled="subData.disabled === 1"
  >
    <router-link
      :disabled="subData.disabled === 1"
      class="link"
      :to="subData.url"
    >
      <z-icon :icon="subData.icon" />
      {{ subData.title }}
    </router-link>
  </el-menu-item>
</template>
<script lang="ts" setup>
import { menuData } from '@/api/types'
import ZIcon from '@/components/ZIcon.vue'

const { subData } = defineProps<{
  subData: menuData
}>()
</script>
<style lang="scss" scoped>
.link {
  color: var(--el-bg-color);
  text-decoration: none;
  &:hover {
    color: var(--el-color-warning);
  }
}
</style>
