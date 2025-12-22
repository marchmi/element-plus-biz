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
<script setup>
import { ElTableColumn } from 'element-plus'
import { defineProps, defineEmits } from 'vue'
import { handleClipboard } from '../../utils/interaction'
import { judgeZero } from '../../utils'
import './style.scss'

const props = defineProps({
  columns: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const emit = defineEmits(['handlePopoverVisible', 'handleClearPopover'])

/**
 * Hide popupOver
 */
const handleClearPopover = () => {
  emit('handleClearPopover')
}

/**
 * Show popupOver
 * @param $event
 * @param row
 */
const handlePopoverVisible = ($event, row) => {
  emit('handlePopoverVisible', $event, row)
}

/**
 * Table double click to copy
 * @param event
 */
const handleCopy = (event) => {
  handleClipboard(event, event.target.innerText)
}

/**
 * Get cell content
 * @param column tableItem
 * @param value
 * @param index
 * @param row
 */
const renderContent = (column, value, index, row) => {
  if (column.render) {
    return column.render(value, index, row)
  }
  if (column.filter) {
    return column.filter(value, index, row)
  }
  return value
}

</script>

