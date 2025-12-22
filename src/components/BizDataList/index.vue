<template>
  <div class="biz-data-list table-container clearfix" :class="{'has-pagination': paginationOpts.total}">
    <slot>
      <biz-table
        ref="tableViewRef"
        v-model:tableOpts="dataOpts"
        v-bind="{...otherDataViewProps, ...$attrs}"
      >
        <template
          v-for="itemSlot in Object.keys($slots)"
          :key="itemSlot"
          #[itemSlot]="props"
        >
          <slot :name="itemSlot" v-bind="props"></slot>
        </template>
      </biz-table>
    </slot>
    <div v-if="paginationOpts.total" class="page-container clearfix">
      <biz-pagination
        v-model:paginationOpts="paginationOpts"
        v-bind="{...otherPaginationViewProps, ...$attrs}"
      >
      </biz-pagination>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed, ref, defineExpose } from 'vue'
import BizTable from '../BizTable/index.vue'
import BizPagination from '../BizPagination/index.vue'
import './style.scss'

const props = defineProps({
  paginationViewOpts: {
    type: Object,
    default: () => {
      return {}
    }
  },
  otherPaginationViewProps: {
    type: Object,
    default: () => {
      return {}
    }
  },
  dataViewOpts: {
    type: Object,
    default: () => {
      return {}
    }
  },
  otherDataViewProps: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const emit = defineEmits(['dataViewOpts', 'paginationViewOpts'])
const dataOpts = computed({
  get: () => props.dataViewOpts,
  set: v => emit('update:dataViewOpts', v)
})

const paginationOpts = computed({
  get: () => props.paginationViewOpts,
  set: v => emit('update:paginationViewOpts', v)
})

const tableViewRef = ref({})
defineExpose({
  tableViewRef,
  clearSelection: computed(() => tableViewRef.value.clearSelection)
})

</script>

