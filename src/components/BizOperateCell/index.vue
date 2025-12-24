<template>
  <div class="operate table-operate biz-operate">
    <template v-if="moreThanNum && data.length > moreThanNum">
      <template v-for="item in data.slice(0, moreThanNum)" :key="item.handleFunc">
        <cell-button
          :item="item"
          :row-data="rowData"
          :row-index="props.rowIndex"
          @handleOperation="handleOperation(item.handleFunc)"></cell-button>
      </template>
      <el-dropdown trigger="click">
        <el-button type="primary" link style="font-weight: bold;">···</el-button>
        <template #dropdown>
          <el-dropdown-menu class="operate-more">
            <el-dropdown-item
              v-for="item in data.slice(moreThanNum)"
              :key="item.handleFunc"
              :disabled="item.isDisabled ? item.isDisabled(rowData, props.rowIndex) : false">
              <cell-button
                :item="item"
                :row-data="rowData"
                :row-index="props.rowIndex"
                placement="left"
                @handleOperation="handleOperation(item.handleFunc)"></cell-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <template v-else>
      <template v-for="item in data" :key="item.handleFunc">
        <cell-button
          :item="item"
          :row-data="rowData"
          @handleOperation="handleOperation(item.handleFunc)"></cell-button>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, watch, ref, defineEmits } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton } from 'element-plus'
import CellButton from './CellButton.vue'
import { isString, isFunction } from '../../utils'
import { hasPermission } from '../../composables/useBizPermission'
import './style.scss'

export interface ButtonItem {
  handleFunc: string | Function
  permission?: string
  isShow?: (rowData: any, rowIndex: number) => boolean
  isDisabled?: (rowData: any, rowIndex: number) => boolean
  [key: string]: any
}

const props = defineProps<{
  moreThanNum?: number
  rowIndex: number
  rowData: any
  buttonData: ButtonItem[]
}>()

const data = ref<ButtonItem[]>([])

/**
 * Watch row data
 */
watch(() => props.rowData.watchId, () => {
  filterButton()
}, { immediate: true, deep: true })

/**
 * Filter button items
 */
function filterButton () {
  // Filter out items without permission and isShow is false
  data.value = props.buttonData?.filter(item => {
    // Determine whether to show
    const showStatus = item.isShow ? item.isShow(props.rowData, props.rowIndex) : true
    // Determine whether there is permission
    const permissionStatus = item.permission ? hasPermission(item.permission) : true
    return showStatus && permissionStatus
  })
}

const emit = defineEmits<{
  handleOperation: [handleFunc: string | Function, rowData: any, rowIndex: number]
}>()

const handleOperation = (handleFunc: string | Function): void => {
  // Determine if handleFunc is a method name or function
  if (isString(handleFunc)) {
    emit('handleOperation', handleFunc, props.rowData, props.rowIndex)
    return
  }
  if (isFunction(handleFunc)) {
    (handleFunc as Function)(props.rowData, props.rowIndex)
  }
}
</script>

