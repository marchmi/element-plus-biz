<template>
  <el-table-column
    v-for="(column) in columns"
    :prop="column.prop"
    :key="column.prop"
    :width="column.width || ''"
    :min-width="column.minWidth || ''"
  >
    <template #header>
      <slot :name="`${column.prop}Header`">
        <span>{{ column.label }}</span>
      </slot>
    </template>
    <template #default="{ row, $index }">
      <div
        class="text-hidden"
        @dblclick="handleCopy($event)"
        @mouseenter="handlePopoverVisible($event, row)"
        @mouseleave="handleClearPopover"
      >
        <slot :name="column.prop" :row="row">
          <span v-html="judgeZero(renderContent(column, row[column.prop], $index, row))"></span>
        </slot>
      </div>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import { ElTableColumn } from 'element-plus'
import { defineProps, defineEmits } from 'vue'
import { handleClipboard } from '../../utils/interaction'
import { judgeZero } from '../../utils'
import type { TableColumn } from '../../utils'
import './style.scss'

const props = defineProps<{
  columns: TableColumn[]
}>()

const emit = defineEmits<{
  handlePopoverVisible: [event: Event, row: any]
  handleClearPopover: []
}>()

/**
 * Hide popupOver
 */
const handleClearPopover = (): void => {
  emit('handleClearPopover')
}

/**
 * Show popupOver
 * @param $event
 * @param row
 */
const handlePopoverVisible = ($event: Event, row: any): void => {
  emit('handlePopoverVisible', $event, row)
}

/**
 * Table double click to copy
 * @param event
 */
const handleCopy = (event: Event): void => {
  handleClipboard(event, (event.target as HTMLElement).innerText)
}

/**
 * Get cell content
 * @param column tableItem
 * @param value
 * @param index
 * @param row
 */
const renderContent = (column: TableColumn, value: any, index: number, row: any): any => {
  if (column.render) {
    return column.render(value, index, row)
  }
  if (column.filter) {
    return column.filter(value, index, row)
  }
  return value
}

</script>

