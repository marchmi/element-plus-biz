/**
 * BizPagination component composable function
 */
import { reactive } from 'vue'

export interface PaginationOptions {
  currentPage: number
  pageSize: number
  total: number
  pageList: number[]
  layout: string
}

interface UseBizPaginationOptions extends Partial<PaginationOptions> {
  otherOpts?: Record<string, any>
  [key: string]: any
}

interface PaginationResult {
  paginationOpts: PaginationOptions
  otherProps: Record<string, any>
}

const defaultOptions: PaginationOptions = {
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageList: [10, 30, 50, 100],
  layout: 'total, sizes, prev, pager, next'
}

/**
 * - Configuration options:
 * - currentPage：Current page
 * - pageSize：Page size
 * - total： Total data count
 * - pageList：Page size selector configuration
 * - layout：Component layout
 * - otherOpts: Other component properties, declared in otherOpts object
 * - ...rest: Remaining properties after object destructuring, finally merged in otherOpts
 * @param options
 * @returns Pagination component props object
 */
export const useBizPagination = (options: UseBizPaginationOptions = defaultOptions): PaginationResult => {
  const mergedOptions = { ...defaultOptions, ...options } as UseBizPaginationOptions
  const { currentPage, pageSize, total, pageList, layout, otherOpts, ...rest } = mergedOptions
  const paginationOpts = reactive<PaginationOptions>({
    currentPage: rest['default-current-page'] || currentPage,
    pageSize: rest['default-page-size'] || pageSize,
    total: total || defaultOptions.total,
    pageList: pageList || defaultOptions.pageList,
    layout: layout || defaultOptions.layout
  })
  const otherProps = reactive({ ...(otherOpts || {}), ...rest })
  return {
    paginationOpts,
    otherProps
  }
}