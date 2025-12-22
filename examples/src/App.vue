<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Element Plus Biz 组件库示例</h1>
      <p>基于 Element Plus 封装的业务组件和函数</p>
    </header>

    <main class="app-main">
      <!-- BizButton 组件示例 -->
      <section class="demo-section">
        <h2>BizButton 组件</h2>
        <div class="demo-content">
          <h3>基本用法</h3>
          <div class="button-group">
            <biz-button type="primary">主要按钮</biz-button>
            <biz-button type="success">成功按钮</biz-button>
            <biz-button type="warning">警告按钮</biz-button>
            <biz-button type="danger">危险按钮</biz-button>
          </div>

          <h3>业务类型</h3>
          <div class="button-group">
            <biz-button biz-type="submit">提交</biz-button>
            <biz-button biz-type="reset">重置</biz-button>
            <biz-button biz-type="cancel">取消</biz-button>
          </div>

          <h3>尺寸</h3>
          <div class="button-group">
            <biz-button size="large">大按钮</biz-button>
            <biz-button>默认按钮</biz-button>
            <biz-button size="small">小按钮</biz-button>
          </div>
        </div>
      </section>

      <!-- BizTable 组件示例 -->
      <section class="demo-section">
        <h2>BizDataList 组件</h2>
        <div class="demo-content">
          <biz-button type="primary" @click="getTableData">
            刷新数据
          </biz-button>
          <biz-data-list
            ref="dataListRef"
            v-model:dataViewOpts="tableOpts"
            v-model:paginationViewOpts="paginationOpts"
            :otherDataViewProps="otherTableOpts"
            :otherPaginationViewProps="otherProps"
            @pageHandleFunc="getTableData"
            @handleEdit="handleEdit"
          >
            <template #field1="{ row }">
              <div>
                {{ row.field1 }}
                {{ row.field2 }}
                {{ row.field3 }}
                {{ row.field4 }}
              </div>
            </template>
          </biz-data-list>
        </div>
      </section>

    </main>

    <footer class="app-footer">
      <p>Element Plus Biz 组件库 &copy; 2025</p>
    </footer>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { initUserPermissions, useBizTable, useBizPagination } from '../../src'

export default {
  name: 'App',
  setup() {
    // 表格分页
    const { paginationOpts, otherProps } = useBizPagination({ total: 100, background: false })

    // 表格数据
    const getTableData = () => {
      tableData.value = paginationOpts.currentPage % 2
        ? [
            { uuid: 2, account: 'account2', email: 'demoemail@2.com', field1: 'field1-2', field2: 'field2-2', field3: 'field3-2', field4: 'field4-2' },
            { uuid: 3, account: 'account3', email: 'demoemail@3.com', field1: 'field1-3', field2: 'field2-3', field3: 'field3-3', field4: 'field4-3' },
            { uuid: 4, account: 'account4', email: 'demoemail@4.com', field1: 'field1-4', field2: 'field2-4', field3: 'field3-4', field4: 'field4-4' }
          ]
        : [
            { uuid: 7, account: 'account7', email: 'demoemail@7.com', field1: 'field1-7', field2: 'field2-7', field3: 'field3-7', field4: 'field4-7' }, 
            { uuid: 9, account: 'account9', email: 'demoemail@9.com', field1: 'field1-9', field2: 'field2-9', field3: 'field3-9', field4: 'field4-9' }
          ]
    }
    /** 表格 */
    const dataListRef = ref()
    const tableData = ref([])

    const handleSelectionChange = (rows) => {
      console.log('rows', rows)
    }

    const handleEdit = (row, idx) => {
      console.log(row, idx)
    }

    const handleDelete = (row, idx) => {
      console.log('删除')
    }

    const { tableOpts, otherProps: otherTableOpts } = useBizTable({
      handleSelectionChange,
      selection: true,
      reserveSelection: true,
      data: tableData,
      columns: [
        { prop: 'account', label: '账号' },
        { prop: 'email', label: '邮箱' },
        { prop: 'field1', label: '插槽' },
        { prop: 'field2', label: 'Long table header text' },
        { prop: 'field3', label: '使用filter呈现内容', filter: (value, idx, row) => { return row.uuid } },
        {
          prop: 'field4',
          label: 'Render 呈现内容',
          minWidth: 80,
          render: (value, idx) => {
            return `<span style="color: red;">${idx}</span>`
          }
        }
      ],
      operation: {
        label: '操作',
        width: '180',
        moreThanNum: 3,
        data: [
          {
            label: '编辑',
            handleFunc: 'handleEdit',
            isShow: (row) => {
              return row.uuid % 2 === 0
            },
            permission: 'user:edit'
          },
          {
            label: '删除',
            handleFunc: handleDelete,
            tooltipMsg: '不满足条件，按钮禁用 ',
            isDisabled: (row) => {
              return row.uuid % 2 === 0
            },
            permission: 'user:delete'
          },
          {
            label: '启用',
            handleFunc: () => {
              console.log('启用')
            },
            permission: 'user:enable'
          },
          {
            label: '禁用',
            handleFunc: () => {
              console.log('禁用')
            },
            permission: 'user:disable'
          }
        ]
      }
    })

    const clearTableSelection = () => {
      dataListRef.value.clearSelection()
    }

    onMounted(() => {
      initUserPermissions(['user:list', 'user:add', 'user:edit', 'user:delete', 'user:enable', 'user:disable'])
      getTableData()
    })

    return {
      clearTableSelection,
      tableOpts,
      otherTableOpts,
      handleEdit,
      handleSelectionChange,
      tableData,
      dataListRef,
      getTableData,
      paginationOpts, 
      otherProps
    }
  }
}
</script>

<style scoped>
.app-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.app-header h1 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 28px;
}

.app-header p {
  margin: 0;
  color: #606266;
  font-size: 16px;
}

.app-main {
  min-height: 600px;
}

.demo-section {
  margin-bottom: 50px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  margin: 0 0 20px 0;
  color: #303133;
  font-size: 22px;
  border-bottom: 1px solid #e4e7ed;
  padding-bottom: 10px;
}

.demo-content {
  padding: 20px 0;
}

.demo-content h3 {
  margin: 20px 0 15px 0;
  color: #409eff;
  font-size: 18px;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.request-result {
  margin-top: 20px;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.request-result pre {
  margin: 0;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
}

.auth-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.auth-info {
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.auth-info h3 {
  margin-top: 0;
}

.auth-info pre {
  margin: 0;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
}

.app-footer {
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
  color: #909399;
  font-size: 14px;
}
</style>