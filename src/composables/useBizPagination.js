
/**
 * BizPagination component composable function
 */
import { reactive } from 'vue'
const defaultOptions = {
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
 * @param {*} options
 * @returns Pagination component props object
 */
export const useBizPagination = (options = defaultOptions) => {
  const { currentPage, pageSize, total, pageList, layout, otherOpts, ...rest } = { ...defaultOptions, ...options }
  const paginationOpts = reactive({
    currentPage: rest['default-current-page'] || 1,
    pageSize: rest['default-page-size'] || 10,
    total,
    pageList,
    layout
  })
  const otherProps = reactive({ ...(otherOpts || {}), ...rest })
  return {
    paginationOpts,
    otherProps
  }
}

