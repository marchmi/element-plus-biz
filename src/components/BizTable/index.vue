<template>
  <div :id="opts.tableUuid">
    <el-popover
      placement="right"
      :content="content"
      v-model:visible="popoverDisabled"
    >
      <template #reference>
        <div class="trigger" :style="{ position: 'fixed', top: `${psi.y}px`, left: `${psi.x}px`, zIndex: 9999, popoverDisabled}">
        </div>
      </template>
    </el-popover>
    <el-table
      ref="tableRef"
      style="width: 100%"
      :border="true"
      :data="opts.data"
      :tree-props="opts.treeProps"
      :row-key="opts.rowKey"
      @selection-change="opts.handleSelectionChange"
      v-bind="{ ...$attrs, otherProps}"
    >
      <el-table-column
        v-if="opts.radioCheckId"
        width="50">
        <template v-slot="scope">
          <el-radio
            v-model="opts.radioCheckValue"
            :label="scope.row[opts.radioCheckId]"
            @change="opts.handleRadioChange(scope.row)">{{ '' }}
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55"
        v-if="opts.selection"
        :reserve-selection="opts.reserveSelection"
       />
      <el-table-column type="expand"
        v-if="$slots['expand']"
      >
        <template #default="props">
          <slot name="expand" v-bind="props"></slot>
        </template>
      </el-table-column>
      <template
        v-for="slot in Object.keys($slots)"
        :key="slot"
        #[slot]="props"
      >
        <slot :name="slot" v-bind="props"></slot>
      </template>
      <biz-column
        :columns="opts.columns"
        @handleClearPopover="handleClearPopover"
        @handlePopoverVisible="handlePopoverVisible"
      >
        <template
          v-for="itemSlot in Object.keys($slots)"
          :key="itemSlot"
          #[itemSlot]="props"
        >
          <slot :name="itemSlot" v-bind="props"></slot>
        </template>
      </biz-column>
      <el-table-column
        v-if="opts.operation.data.length"
        fixed="right"
        :label="opts.operation.label"
        :width="opts.operation.computedWidth || opts.operation.width"
        :min-width="opts.operation.minWidth || ''"
        :class-name="opts.operation.className || ''">
        <template v-slot="scope">
          <biz-operate-cell
            @handleOperation="handleOperation"
            :more-than-num="opts.operation.moreThanNum"
            :row-data="scope.row"
            :row-index="scope.$index"
            :button-data="opts.operation.data">
          </biz-operate-cell>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, defineEmits, defineExpose, getCurrentInstance } from 'vue'
import { ElPopover, ElTable, ElTableColumn, ElRadio } from 'element-plus'
import BizColumn from '../BizColumn/index.vue'
import BizOperateCell from '../BizOperateCell/index.vue'
import { getTextWidth } from '../../utils'

const { proxy } = getCurrentInstance()

// popupOver positioning Start
const psi = ref({ // popupOver position
  x: 0,
  y: 0
})
const content = ref('') // popupOver content
const popoverDisabled = ref(false)

/**
 * Determine whether to show popupOver
 * @param $event
 * @param row
 */
const handlePopoverVisible = ($event, row) => { // Determine whether to show popupOver
  const { innerText, offsetWidth, offsetHeight } = $event.srcElement
  const { x, y } = $event.target.getBoundingClientRect()
  psi.value = { x: x + offsetWidth, y: y + (offsetHeight / 2) }
  content.value = innerText
  // Single line content width
  const currentWidth = getTextWidth($event.target.innerText)
  // Table container width
  const cellWidth = $event.target.offsetWidth
  popoverDisabled.value = currentWidth > cellWidth * 2
}

const handleClearPopover = () => { // Hide popupOver
  popoverDisabled.value = false
}
// popupOver positioning End

const props = defineProps({
  tableOpts: {
    type: Object,
    default: () => {
      return {
        radioCheckId: 'id',
        radioCheckValue: null,
        handleRadioChange: (row) => {
          console.log(row)
        }
      }
    }
  },
  otherProps: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit = defineEmits(['tableOpts'])
const opts = computed({
  get: () => props.tableOpts,
  set: v => emit('update:tableOpts', v)
})

/**
 * Button operation: permission check
 * @param handleName
 * @param row
 * @param subscript
 */
const handleOperation = (handleName, row, subscript) => {
  proxy.$emit(handleName, row, subscript)
}

const tableRef = ref({})
defineExpose({
  tableRef,
  clearSelection: computed(() => tableRef.value.clearSelection)
})

</script>

