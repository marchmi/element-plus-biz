import { ref } from 'vue'

interface TableHeaderFontConfig {
  font: string
  offset: number
}

interface ToastConfig {
  offset: number
  duration: number
  messageBoxSelector: string
  successToastClass: string
  errorToastClass: string
  warningToastClass: string
  infoToastClass: string
  [key: string]: any
}

interface LoadingConfig {
  customClass: string
  spinner: string
  background: string
  text: string
  target: string | HTMLElement
  [key: string]: any
}

interface ConfirmConfig {
  tips: string
  confirmButtonText: string
  cancelButtonText: string
  distinguishCancelAndClose: boolean
  closeOnClickModal: boolean
  customClass: string
  [key: string]: any
}

interface BizConfigure {
  tableHeaderFont: TableHeaderFontConfig
  textFont: string
  toastConfig: ToastConfig
  loadingConfig: LoadingConfig
  confirmConfig: ConfirmConfig
  [key: string]: any
}

interface UpdateConfigs {
  tableHeaderFont?: Partial<TableHeaderFontConfig>
  textFont?: string
  toastConfig?: Partial<ToastConfig>
  loadingConfig?: Partial<LoadingConfig>
  confirmConfig?: Partial<ConfirmConfig>
  [key: string]: any
}

/**
 * Global configuration - high frequency configuration items
 */
export const bizConfigure = ref<BizConfigure>({
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
export const useBizConfigure = (initConfigs: UpdateConfigs = {}): { updateConfigs: (configs: UpdateConfigs) => void } => {
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
  const updateConfigs = (updateConfigs: UpdateConfigs = {}): void => {
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