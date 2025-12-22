<template>
  <div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="opts.pageList || [10, 30, 50, 100]"
      :page-size="opts.pageSize"
      :current-page="opts.currentPage"
      :layout="opts.layout || 'total, sizes, prev, pager, next'"
      :total="parseInt(opts.total)"
      v-bind="{ ...$attrs, otherProps}"
      v-if="opts?.total">
        <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="props">
          <slot :name="slot" v-bind="props"></slot>
        </template>
    </el-pagination>
  </div>
</template>

<script setup>
import { ElPagination } from 'element-plus'
import { defineProps, defineEmits, computed } from 'vue'

const emit = defineEmits(['update:paginationOpts', 'pageHandleFunc'])
const props = defineProps({
  paginationOpts: {
    type: Object,
    required: true
  },
  otherProps: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const opts = computed({
  get: () => props.paginationOpts,
  set: v => emit('update:paginationOpts', v)
})
const handleSizeChange = (pageSize) => {
  opts.value.pageSize = pageSize
  handleCurrentChange(1)
}
const handleCurrentChange = (currentPage) => {
  opts.value.currentPage = currentPage
  emit('pageHandleFunc')
}
</script>
