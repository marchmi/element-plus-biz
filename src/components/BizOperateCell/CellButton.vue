<template>
  <el-tooltip
    effect="dark"
    :placement="placement"
    :content="item.tooltipMsg"
    :disabled="!item.tooltipMsg || !(item.isDisabled ? item.isDisabled(rowData) : false)">
    <div class="button-wrapper">
      <el-button
        type="primary"
        link
        :disabled="item.isDisabled ? item.isDisabled(rowData, rowIndex) : false"
        @click="$emit('handleOperation')">
        {{ typeof item.label === 'function' ? item.label(rowData) : item.label }}
      </el-button>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { ElTooltip, ElButton } from 'element-plus'
import type { ButtonItem } from './index.vue'

defineProps<{
  item: ButtonItem
  rowData: any
  rowIndex: number
  placement?: string
}>()
</script>

