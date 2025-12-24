import type { DefineComponent, Component } from 'vue'
// Note: Element Plus styles need to be imported by the user

// Import components
import BizButton from './components/BizButton/index.vue'
import BizTable from './components/BizTable/index.vue'
import BizPagination from './components/BizPagination/index.vue'
import BizColumn from './components/BizColumn/index.vue'
import BizDataList from './components/BizDataList/index.vue'
import BizOperateCell from './components/BizOperateCell/index.vue'

// Import composable functions
import { useBizPagination } from './composables/useBizPagination'
import { useBizTable } from './composables/useBizTable'
import { useBizPermission } from './composables/useBizPermission'

// Export all components
const components: Record<string, Component> = {
  BizButton: BizButton as DefineComponent,
  BizTable: BizTable as DefineComponent,
  BizPagination: BizPagination as DefineComponent,
  BizColumn: BizColumn as DefineComponent,
  BizDataList: BizDataList as DefineComponent,
  BizOperateCell: BizOperateCell as DefineComponent
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
export { hasPermission, initUserPermissions } from './composables/useBizPermission'
export { useBizConfigure } from './composables/useBizConfigure'

// Export utility functions
export * from './utils/index'
export * from './utils/interaction'
// Export default install function
export default {
  install(app: any) {
    // Register all components
    for (const component in components) {
      app.component(component, components[component])
    }
  }
}