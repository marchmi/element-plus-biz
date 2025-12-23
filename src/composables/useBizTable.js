/**
 * BizTable component composable function
 */
import { reactive, nextTick, watch } from 'vue'
import { createUuid, resetTableHeaderWidth } from '../utils'

/**
 * Render operation column header width
 * @param tableOpts
 */
const renderOperateHeader = (tableOpts) => {
  nextTick(() => {
    const tableContainer = document.getElementById(tableOpts.tableUuid)
    const operateColumn = tableContainer.getElementsByClassName('table-operate') || []
    if (operateColumn.length > 0) {
      const widthArr = []
      Array.prototype.forEach.call(operateColumn, function (item) {
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
const getOpreationColumnWidth = (doms) => {
  const gapWidth = (doms.length - 1) * 4
  let btnsWidth = 0
  Array.prototype.forEach.call(doms, (dom) => {
    btnsWidth += dom.offsetWidth
  })
  return btnsWidth + gapWidth
}

/**
 * Default configuration options
 */
const defaultOptions = {
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
  handleRadioChange: (row) => {}, // Callback when radio selection changes
  handleSelectionChange: (rows) => { console.log(rows) } // Callback when multiple selection changes
}
/**
 * Composable function
 * @param options
 * @returns {{tableOpts: *, otherProps: *}}
 */
export const useBizTable = (options = defaultOptions) => {
  const {
    data, columns, treeProps, rowKey,
    selection, reserveSelection, radioCheckId, radioCheckValue,
    operation, handleRadioChange, handleSelectionChange,
    otherOpts, ...rest
  } = { ...defaultOptions, ...options }
  resetTableHeaderWidth(columns)
  const tableOpts = reactive({
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
  const otherProps = reactive({ ...(otherOpts || {}), ...rest })
  watch(() => tableOpts.data, (val) => {
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

