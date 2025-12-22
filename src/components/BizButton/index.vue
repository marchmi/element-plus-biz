<template>
  <el-button
    :class="['biz-button', bizType ? 'biz-button--' + bizType : '']"
    :type="type"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </el-button>
</template>

<script>
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import './style.scss'

export default defineComponent({
  name: 'BizButton',
  components: {
    ElButton
  },
  props: {
    // Extend Element Plus Button props
    type: {
      type: String,
      default: 'primary'
    },
    // Custom business property
    bizType: {
      type: String,
      default: ''
    },
    // Permission control
    permission: {
      type: String,
      default: ''
    }
  }
})
</script>