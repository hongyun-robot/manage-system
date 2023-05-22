<template>
  <el-icon v-bind="$attrs">
    <component :is="icon" />
  </el-icon>
</template>
<script lang="ts" setup>
const {icon} = defineProps<{
  icon: string
}>()
</script>
<style lang="scss" scoped></style>
