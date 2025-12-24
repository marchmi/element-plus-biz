<template>
  <el-button
    :class="['biz-button', bizType ? 'biz-button--' + bizType : '']"
    :type="type"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import './style.scss'
import { hasPermission } from '@/composables/useBizPermission'

// Extend Element Plus Button props
defineProps<{
  type?: string
  // Custom business property
  bizType?: string
  // Permission control
  permission?: string
}>()
</script>

<script lang="ts">
export default {
  name: 'BizButton'
}
</script>