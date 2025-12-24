import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { bizConfigure } from '../composables/useBizConfigure'

export interface ConfirmOptions {
  tips?: string
  content: string
  confirmBtnText?: string
  cancelBtnText?: string
  confirmCallback?: () => void
  cancelCallback?: () => void
  [key: string]: any
}

/**
 * Information confirmation dialog
 * @param options
 */
export function confirm(options: ConfirmOptions): void {
  if (document.getElementsByClassName('message-box').length === 0) {
    ElMessageBox.confirm(options.content, options.tips || bizConfigure.value.confirmConfig.tips, {
      confirmButtonText: options.confirmBtnText || bizConfigure.value.confirmConfig.confirmButtonText,
      cancelButtonText: options.cancelBtnText || bizConfigure.value.confirmConfig.cancelButtonText,
      distinguishCancelAndClose: bizConfigure.value.confirmConfig.distinguishCancelAndClose,
      closeOnClickModal: bizConfigure.value.confirmConfig.closeOnClickModal,
      customClass: bizConfigure.value.confirmConfig.customClass,
      ...(options || {})
    }).then(() => {
      if (options.confirmCallback) {
        options.confirmCallback()
      }
    }).catch((action: string) => {
      if (action === 'cancel' && options.cancelCallback) {
        options.cancelCallback()
      }
    })
  }
}

/**
 * Toast success
 * @param msg
 * @param selector
 */
export function successMsg(msg: string, selector: string = bizConfigure.value.toastConfig.successToastClass): void {
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
 * @param selector
 */
export function errorMsg(msg: string, selector: string = bizConfigure.value.toastConfig.errorToastClass): void {
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
 * @param selector
 */
export function warningMsg(msg: string, selector: string = bizConfigure.value.toastConfig.warningToastClass): void {
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
 * @param selector
 */
export function infoMsg(msg: string, selector: string = bizConfigure.value.toastConfig.infoToastClass): void {
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
 * @param target
 * @returns
 */
export function createLoading(target: string | HTMLElement = bizConfigure.value.loadingConfig.target): ReturnType<typeof ElLoading.service> {
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
 * @param successMsgText
 */
export async function handleClipboard(_event: Event, text: string, successMsgText: string = 'Copied successfully!'): Promise<void> {
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
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy') // Legacy copy API
    document.body.removeChild(textarea)
    successMsg(successMsgText)
  }
}