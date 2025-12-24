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
        <template v-for="(slot, index) in Object.keys($slots)" :key="index" #[slot]="props">
          <slot :name="slot" v-bind="props"></slot>
        </template>
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ElPagination } from 'element-plus'
import { defineProps, defineEmits, computed } from 'vue'
import type { PaginationOptions } from '@/composables/useBizPagination'

const emit = defineEmits<{
  'update:paginationOpts': [value: PaginationOptions]
  pageHandleFunc: []
}>()

const props = defineProps<{
  paginationOpts: PaginationOptions
  otherProps: Record<string, any>
}>()

const opts = computed({
  get: () => props.paginationOpts,
  set: (v: PaginationOptions) => emit('update:paginationOpts', v)
})

const handleSizeChange = (pageSize: number): void => {
  opts.value.pageSize = pageSize
  handleCurrentChange(1)
}

const handleCurrentChange = (currentPage: number): void => {
  opts.value.currentPage = currentPage
  emit('pageHandleFunc')
}
</script>
