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
        :disabled="item.isDisabled ? item.isDisabled(rowData) : false"
        @click="$emit('handleOperation')">
        {{ typeof item.label === 'function' ? item.label(rowData) : item.label }}
      </el-button>
    </div>
  </el-tooltip>
</template>

<script setup>
import { defineProps } from 'vue'
import { ElTooltip, ElButton } from 'element-plus'

defineProps({
  item: Object,
  rowData: Object,
  placement: {
    type: String,
    default: () => 'top'
  }
})
</script>

