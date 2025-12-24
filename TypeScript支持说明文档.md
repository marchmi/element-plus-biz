# Element-Plus-Biz TypeScript 支持说明文档

## 1. 引言

本文档详细说明为 `element-plus-biz` 项目添加 TypeScript 支持的过程和所做的更改。通过引入 TypeScript，我们提升了项目的类型安全性、可维护性和开发体验，同时保持与 Vue 3 和 Element Plus 的兼容性。

## 2. 依赖安装

首先，我们安装了 TypeScript 及其相关依赖：

```bash
npm install --save-dev typescript @vue/tsconfig vite-plugin-dts
```

使用 `--legacy-peer-deps` 解决了 Vite 版本冲突问题：

```bash
npm install --save-dev typescript @vue/tsconfig vite-plugin-dts --legacy-peer-deps
```

## 3. 配置文件更改

### 3.1 tsconfig.json

创建了 TypeScript 配置文件，启用了严格类型检查并配置了 Vue 3 支持：

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["src/**/*.ts", "src/**/*.vue"],
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "declaration": false
  }
}
```

### 3.2 vite.config.js

修改了 Vite 配置，添加了 TypeScript 支持和类型声明生成：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*'],
      outDir: 'dist'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'element-plus-biz',
      fileName: (format) => `element-plus-biz.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
```

### 3.3 package.json

更新了 `package.json`，添加了 TypeScript 类型声明入口和修改了导出配置：

```json
{
  "main": "dist/element-plus-biz.cjs.js",
  "module": "dist/element-plus-biz.es.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": ["./dist/element-plus-biz.es.js", "./dist/index.d.ts"],
      "require": ["./dist/element-plus-biz.cjs.js", "./dist/index.d.ts"]
    }
  },
  "devDependencies": {
    "typescript": "^5.2.2",
    "@vue/tsconfig": "^0.5.0",
    "vite-plugin-dts": "^3.9.1"
  }
}
```

### 3.4 src/shims-vue.d.ts

创建了 Vue 组件的类型声明文件：

```typescript
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

## 4. 文件迁移

### 4.1 主入口文件

将 `src/index.js` 重命名为 `src/index.ts`，并更新了导出语法：

```typescript
import { App, Plugin } from 'vue'
import './styles/index.scss'
import BizButton from './components/BizButton/index.vue'
import BizColumn from './components/BizColumn/index.vue'
import BizDataList from './components/BizDataList/index.vue'
import BizPagination from './components/BizPagination/index.vue'
import BizTable from './components/BizTable/index.vue'
import { useBizTable } from './composables/useBizTable'
import { useBizPagination } from './composables/useBizPagination'
import { useBizPermission } from './composables/useBizPermission'

const components = [
  BizButton,
  BizColumn,
  BizDataList,
  BizPagination,
  BizTable
]

const install: Plugin = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default {
  install
}

export {
  BizButton,
  BizColumn,
  BizDataList,
  BizPagination,
  BizTable,
  useBizTable,
  useBizPagination,
  useBizPermission
}
```

### 4.2 Utils 目录

将所有 `.js` 文件转换为 `.ts` 文件，并添加了类型注解：

- `src/utils/index.ts`
- `src/utils/helpers.ts`
- `src/utils/clipboard.ts`

### 4.3 Composables 目录

为组合式函数添加了详细的 TypeScript 接口定义：

#### 4.3.1 useBizTable.ts

```typescript
export interface OperationConfig {
  show?: boolean
  width?: number | string
  fixed?: boolean
  label?: string
}

export interface TableOptions {
  tableUuid: string
  operation: OperationConfig
  data: any[]
  columns: TableColumn[]
  handleOperation?: Function
  [key: string]: any
}

export const useBizTable = (options: UseBizTableOptions): UseBizTableResult => {
  // ...
}
```

#### 4.3.2 useBizPagination.ts

```typescript
export interface PaginationOptions {
  pageSize: number
  currentPage: number
  total: number
  pageList?: number[]
  layout?: string
  [key: string]: any
}

export const useBizPagination = (options: UseBizPaginationOptions): UseBizPaginationResult => {
  // ...
}
```

#### 4.3.3 useBizPermission.ts

```typescript
export interface PermissionOptions {
  permissionMap: Record<string, boolean>
}

export const useBizPermission = (options?: PermissionOptions): UseBizPermissionResult => {
  // ...
}
```

### 4.4 Components 目录

将所有 Vue 组件迁移到 `<script setup lang="ts">` 语法，并添加了类型注解：

#### 4.4.1 BizButton/index.vue

```vue
<script setup lang="ts">
defineProps<{
  type?: string
  bizType?: string
  permission?: string
  [key: string]: any
}>()
</script>
```

#### 4.4.2 BizColumn/index.vue

```typescript
import type { TableColumn } from '../../utils'

const props = defineProps<{
  column: TableColumn
  rowIndex: number
  rowData: any
  hasCopy?: boolean
}>()
```

#### 4.4.3 BizOperateCell/index.vue

```typescript
export interface ButtonItem {
  handleFunc: string | Function
  permission?: string
  isShow?: (rowData: any, rowIndex: number) => boolean
  isDisabled?: (rowData: any, rowIndex: number) => boolean
  [key: string]: any
}
```

## 5. 类型声明生成

使用 `vite-plugin-dts` 自动生成类型声明文件，在构建时会在 `dist` 目录下生成 `.d.ts` 文件，确保库的消费者能够获得完整的类型支持。

## 6. 构建和测试

### 6.1 构建项目

```bash
npm run build
```

这将生成带有类型声明的构建产物。

### 6.2 测试类型检查

```bash
npx tsc --noEmit
```

确保所有 TypeScript 类型正确，没有类型错误。

## 7. 常见问题和解决方案

### 7.1 Vue 组件类型声明错误

**问题**：`Could not find a declaration file for module './components/BizButton/index.vue'`

**解决方案**：创建了 `src/shims-vue.d.ts` 文件来声明 Vue 组件的类型。

### 7.2 依赖冲突

**问题**：安装依赖时出现版本冲突

**解决方案**：使用 `--legacy-peer-deps` 参数解决 Vite 版本冲突。

### 7.3 未使用参数错误

**问题**：`Parameter 'event' is declared but its value is never read`

**解决方案**：在未使用的参数前添加下划线，如 `_event: Event`。

## 8. 总结

通过以上步骤，我们成功为 `element-plus-biz` 项目添加了 TypeScript 支持：

1. 安装了必要的 TypeScript 依赖
2. 配置了 TypeScript 和 Vite
3. 将所有 JavaScript 文件转换为 TypeScript
4. 为组合式函数和组件添加了详细的类型定义
5. 配置了类型声明文件的自动生成

这些更改提升了项目的类型安全性和可维护性，同时保持了与现有代码和依赖的兼容性。