import { bizConfigure } from '../composables/useBizConfigure'
export function judgeZero (value) {
  return value === null || value === undefined || value === '' ? '--' : value;
}

/**
 * Dynamically calculate text length
 * @param text
 * @param font
 * @returns {number}
 */
export function getTextWidth (text, font = bizConfigure.value.textFont || 'normal 14px Segoe UI') {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  const context = canvas.getContext('2d')
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}
/**
 * Reset table header width
 * @param columns
 */
export function resetTableHeaderWidth (columns) {
  columns?.forEach(column => {
    const { width = 0, minWidth = 0, label='' } = column
    const { font = 'bold 14px Segoe UI', offset = 26 } = bizConfigure.value.tableHeaderFont
    column.minWidth = Math.max(getTextWidth(label, font) + offset, minWidth, width)
  })
}

export function isString (value) {
  return typeof value === 'string'
}

export function isFunction (value) {
  return typeof value === 'function'
}

/**
 * Generate UUID
 * @returns {string}
 */
export function createUuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const clearEmpty = (obj) => {
  
}