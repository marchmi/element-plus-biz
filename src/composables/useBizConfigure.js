import { ref } from 'vue'
/**
 * Global configuration - high frequency configuration items
 */
export const bizConfigure = ref({
  tableHeaderFont: {
    font: 'bold 14px Segoe UI',
    offset: 26
  },
  textFont: 'normal 14px Segoe UI',
  toastConfig: {
    offset: 40,
    duration: 3000,
    messageBoxSelector: 'message-box',
    successToastClass: 'el-message el-message--success',
    errorToastClass: 'el-message el-message--error',
    warningToastClass: 'el-message el-message--warning',
    infoToastClass: 'el-message el-message--info',
  },
  loadingConfig: {
    customClass: 'global-loading',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, .5)',
    text: 'Loading...',
    target: 'body'
  },
  confirmConfig: {
    tips: 'System prompt',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    distinguishCancelAndClose: true,
    closeOnClickModal: false,
    customClass: 'message-box',
  } 
})
/**
 * Composable function
 * @param initConfigs
 * @returns { updateConfigs }
 */
export const useBizConfigure = (initConfigs = {}) => {
  const { tableHeaderFont, toastConfig, loadingConfig, confirmConfig, ...others } = initConfigs
  // Initialize configuration
  bizConfigure.value = {
    ...bizConfigure.value,
    tableHeaderFont: {
      ...bizConfigure.value.tableHeaderFont,
      ...tableHeaderFont
    },
    toastConfig: {
      ...bizConfigure.value.toastConfig,
      ...toastConfig
    },
    loadingConfig: {
      ...bizConfigure.value.loadingConfig,
      ...loadingConfig
    },
    confirmConfig: {
      ...bizConfigure.value.confirmConfig,
      ...confirmConfig
    },
    ...others
  }
  /**
   * Update configuration
   * @param updateConfigs
   */
  const updateConfigs = (updateConfigs = {}) => {
    const { tableHeaderFont, toastConfig, loadingConfig, confirmConfig, ...others } = updateConfigs
    bizConfigure.value = {
      ...bizConfigure.value,
      tableHeaderFont: {
        ...bizConfigure.value.tableHeaderFont,
        ...tableHeaderFont
      },
      toastConfig: {
        ...bizConfigure.value.toastConfig,
        ...toastConfig
      },
      loadingConfig: {
        ...bizConfigure.value.loadingConfig,
        ...loadingConfig
      },
      confirmConfig: {
        ...bizConfigure.value.confirmConfig,
        ...confirmConfig
      },
      ...others
    }
  }
  return {
    updateConfigs
  }
}
