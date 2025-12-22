// Note: Element Plus styles need to be imported by the user

// Import components
import BizButton from './components/BizButton/index.vue'
import BizTable from './components/BizTable/index.vue'
import BizPagination from './components/BizPagination/index.vue'
import BizColumn from './components/BizColumn/index.vue'
import BizDataList from './components/BizDataList/index.vue'
import BizOperateCell from './components/BizOperateCell/index.vue'

// Import composable functions
import { useBizPagination } from './composables/useBizPagination.js'
import { useBizTable } from './composables/useBizTable.js'
import { useBizPermission } from './composables/useBizPermission.js'

// Export all components
const components = {
  BizButton,
  BizTable,
  BizPagination,
  BizColumn,
  BizDataList,
  BizOperateCell
}

// Export all composable functions
export {
  BizButton,
  BizTable,
  BizPagination,
  BizColumn,
  BizDataList,
  BizOperateCell,
  useBizPagination,
  useBizTable,
  useBizPermission
}
export { hasPermission, initUserPermissions } from './composables/useBizPermission.js'
export { useBizConfigure } from './composables/useBizConfigure.js'

// Export utility functions
export * from './utils/index.js'
export * from './utils/interaction.js'
// Export default install function
export default {
  install(app) {
    // Register all components
    for (const component in components) {
      app.component(component, components[component])
    }
  }
}