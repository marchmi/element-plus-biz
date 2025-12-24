/**
 * BizTable component composable function
 */
import { reactive, nextTick, watch } from 'vue'
import { createUuid, resetTableHeaderWidth } from '../utils'
import type { TableColumn } from '../utils'

/**
 * Operation column configuration interface
 */
export interface OperationConfig {
  data: any[]
  computedWidth?: number
  [key: string]: any
}

/**
 * Table options interface
 */
export interface TableOptions {
  tableUuid: string
  operation: OperationConfig
  data: any[]
  columns: TableColumn[]
  treeProps: {
    children: string
    hasChildren: string
  }
  rowKey: string
  selection: boolean
  reserveSelection: boolean
  radioCheckId: string | null
  radioCheckValue: any
  handleRadioChange: (row: any) => void
  handleSelectionChange: (rows: any[]) => void
  [key: string]: any
}

/**
 * Options for useBizTable composable
 */
export interface UseBizTableOptions extends Partial<TableOptions> {
  otherOpts?: Record<string, any>
}

/**
 * Result returned by useBizTable composable
 */
export interface UseBizTableResult {
  tableOpts: TableOptions
  otherProps: Record<string, any>
}

/**
 * Render operation column header width
 * @param tableOpts
 */
const renderOperateHeader = (tableOpts: TableOptions): void => {
  nextTick(() => {
    const tableContainer = document.getElementById(tableOpts.tableUuid)
    if (!tableContainer) return
    
    const operateColumn = tableContainer.getElementsByClassName('table-operate') || []
    if (operateColumn.length > 0) {
      const widthArr: number[] = []
      Array.prototype.forEach.call(operateColumn, function (item: HTMLElement) {
        widthArr.push(getOpreationColumnWidth(item.children))
      })
      const maxWidth = Math.max(...widthArr) + 22
      tableOpts.operation.computedWidth = maxWidth > 80 ? maxWidth : 80
    }
  })
}

/**
 * Calculate operation column width
 * @param doms
 * @returns {number}
 */
const getOpreationColumnWidth = (doms: HTMLCollection): number => {
  const gapWidth = (doms.length - 1) * 4
  let btnsWidth = 0
  Array.prototype.forEach.call(doms, (dom: HTMLElement) => {
    btnsWidth += dom.offsetWidth
  })
  return btnsWidth + gapWidth
}

/**
 * Default configuration options
 */
const defaultOptions: TableOptions = {
  tableUuid: createUuid(),
  operation: { data: [] }, // Operation column configuration
  data: [], // Table data
  columns: [], // Data items
  treeProps: { children: 'children', hasChildren: 'hasChildren' },
  rowKey: 'uuid',
  selection: false, // Enable multiple selection, used with rowKey
  reserveSelection: false, // Whether to keep selection when paging with multiple selection
  radioCheckId: null, // null | object property name, enables table radio selection when configured
  radioCheckValue: null, // Current option
  handleRadioChange: (_row: any) => {}, // Callback when radio selection changes
  handleSelectionChange: (rows: any[]) => { console.log(rows) } // Callback when multiple selection changes
}

/**
 * Composable function
 * @param options
 * @returns {{tableOpts: *, otherProps: *}}
 */
export const useBizTable = (options: UseBizTableOptions = defaultOptions): UseBizTableResult => {
  const {
    data,
    columns,
    treeProps,
    rowKey,
    selection,
    reserveSelection,
    radioCheckId,
    radioCheckValue,
    operation,
    handleRadioChange,
    handleSelectionChange,
    otherOpts,
    ...rest
  } = { ...defaultOptions, ...options }
  
  resetTableHeaderWidth(columns)
  
  const tableOpts = reactive<TableOptions>({
    tableUuid: rest.tableUuid,
    operation,
    data,
    columns,
    treeProps,
    rowKey,
    selection,
    reserveSelection,
    radioCheckId,
    radioCheckValue,
    handleRadioChange,
    handleSelectionChange
  })
  
  const otherProps = reactive<Record<string, any>>({ ...(otherOpts || {}), ...rest })
  
  watch(() => tableOpts.data, (_val: any[]) => {
    let waitOpreateRenderTimeout = 300
    // After data update, operation column width needs to be recalculated
    setTimeout(() => {
      waitOpreateRenderTimeout = 0
      renderOperateHeader(tableOpts)
    }, waitOpreateRenderTimeout)
  })
  
  return {
    tableOpts,
    otherProps
  }
}