import { bizConfigure } from '../composables/useBizConfigure'

export function judgeZero(value: any): any {
  return value === null || value === undefined || value === '' ? '--' : value
}

/**
 * Dynamically calculate text length
 * @param text
 * @param font
 * @returns {number}
 */
export function getTextWidth(text: string, font: string = bizConfigure.value.textFont || 'normal 14px Segoe UI'): number {
  // re-use canvas object for better performance
  const canvas = (getTextWidth as any).canvas || ((getTextWidth as any).canvas = document.createElement('canvas'))
  const context = canvas.getContext('2d')
  if (!context) return 0
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}

export interface TableColumn {
  width?: number
  minWidth?: number
  label: string
  [key: string]: any
}

/**
 * Reset table header width
 * @param columns
 */
export function resetTableHeaderWidth(columns: TableColumn[] | undefined): void {
  columns?.forEach(column => {
    const { width = 0, minWidth = 0, label = '' } = column
    const { font = 'bold 14px Segoe UI', offset = 26 } = bizConfigure.value.tableHeaderFont
    column.minWidth = Math.max(getTextWidth(label, font) + offset, minWidth, width)
  })
}

export function isString(value: any): boolean {
  return typeof value === 'string'
}

export function isFunction(value: any): boolean {
  return typeof value === 'function'
}

/**
 * Generate UUID
 * @returns {string}
 */
export function createUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const clearEmpty = (obj: Record<string, any>): Record<string, any> => {
  const newObj: Record<string, any> = {}
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      newObj[key] = obj[key]
    }
  }
  return newObj
}