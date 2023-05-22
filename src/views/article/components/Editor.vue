<template>
  <MdEditor :model-value="modelValue" @change="$emit('update:modelValue', $event)" />
</template>
<script lang="ts" setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
interface Props {
  modelValue: string
}
defineProps<Props>()
defineEmits(['update:modelValue'])

// const text = ref('# Hello Editor');
</script>
<style lang='scss' scoped>
</style>
