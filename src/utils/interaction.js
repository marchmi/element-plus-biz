import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { bizConfigure } from '../composables/useBizConfigure.js'

/**
 * Information confirmation dialog
 * @param tips
 * @param content
 * @param okText
 * @param cancelText
 * @param confirmCallback
 * @param cancelCallback
 * @param ...restOptions Other parameters to override
 */
export function confirm ({ tips, content, confirmBtnText, cancelBtnText, confirmCallback, cancelCallback, ...restOptions }) {
  if (document.getElementsByClassName('message-box').length === 0) {
    ElMessageBox.confirm(content, tips || bizConfigure.value.confirmConfig.tips, {
      confirmButtonText: confirmBtnText || bizConfigure.value.confirmConfig.confirmButtonText,
      cancelButtonText: cancelBtnText || bizConfigure.value.confirmConfig.cancelButtonText,
      distinguishCancelAndClose: bizConfigure.value.confirmConfig.distinguishCancelAndClose,
      closeOnClickModal: bizConfigure.value.confirmConfig.closeOnClickModal,
      customClass: bizConfigure.value.confirmConfig.customClass,
      ...(restOptions || {})
    }).then(() => {
      if (confirmCallback) {
        confirmCallback()
      }
    }).catch((action) => {
      if (action === 'cancel' && cancelCallback) {
        cancelCallback()
      }
    })
  }
}

/**
 * Toast success
 * @param msg
 */
export function successMsg (msg, selector = bizConfigure.value.toastConfig.successToastClass) {
  if (document.getElementsByClassName(selector).length === 0) {
    ElMessage.success({
      message: msg,
      offset: 40,
      duration: 3000
    })
  }
}

/**
 * Toast error
 * @param msg
 */
export function errorMsg (msg, selector = bizConfigure.value.toastConfig.errorToastClass) {
  if (document.getElementsByClassName(selector).length === 0) {
    ElMessage.error({
      message: msg,
      offset: 40,
      duration: 3000
    })
  }
}

/**
 * Toast warning
 * @param msg
 */
export function warningMsg (msg, selector = bizConfigure.value.toastConfig.warningToastClass) {
  if (document.getElementsByClassName(selector).length === 0) {
    ElMessage.warning({
      message: msg,
      offset: 40,
      duration: 3000
    })
  }
}

/**
 * Toast info
 * @param msg
 */
export function infoMsg (msg, selector = bizConfigure.value.toastConfig.infoToastClass) {
  if (document.getElementsByClassName(selector).length === 0) { 
    ElMessage({
      message: msg,
      offset: 40,
      duration: 3000
    })
  }
}

/**
 * Create global loading
 * @returns
 */
export function createLoading (target = bizConfigure.value.loadingConfig.target) {
  return ElLoading.service({
    customClass: bizConfigure.value.loadingConfig.customClass,
    spinner: bizConfigure.value.loadingConfig.spinner,
    background: bizConfigure.value.loadingConfig.background,
    text: bizConfigure.value.loadingConfig.text,
    target
  })
}

/**
 * Handle copying text to clipboard
 * @param event
 * @param text
 */
export async function handleClipboard (event, text, successMsgText = 'Copied successfully!') {
  try {
    // Modern browser native API (HTTPS/localhost support)
    await navigator.clipboard.writeText(text)
    successMsg(successMsgText)
  } catch (err) {
    // Fallback solution: Compatible with old browsers/HTTP environment
    const textarea = document.createElement('textarea')
    textarea.value = text
    // Avoid affecting page layout
    textarea.style.position = 'fixed'
    textarea.style.opacity = 0
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy') // Legacy copy API
    document.body.removeChild(textarea)
    successMsg(successMsgText)
  }
}

