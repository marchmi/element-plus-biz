import { ref } from 'vue'

/**
 * Type definition for permission
 */
export type Permission = string

/**
 * User permissions store
 */
const userPermissions = ref<Permission[]>([])

/**
 * Initialize user permissions
 * @param permissions - Array of permission strings
 */
export const initUserPermissions = (permissions: Permission[]): void => {
  userPermissions.value = permissions
}

/**
 * Check if user has specific permission
 * @param permission - Permission string to check
 * @returns {boolean} True if user has the permission
 */
export const hasPermission = (permission: Permission): boolean => {
  return userPermissions.value.includes(permission)
}

/**
 * Result returned by useBizPermission composable
 */
export interface UseBizPermissionResult {
  permissions: ReturnType<typeof ref<Permission[]>>
  setPermission: (permissionList: Permission[]) => void
  clearPermission: () => void
}

/**
 * Composable function for permission management
 * @returns {UseBizPermissionResult}
 */
export const useBizPermission = (): UseBizPermissionResult => {
  const permissions = userPermissions
  
  const setPermission = (permissionList: Permission[]): void => {
    userPermissions.value = permissionList
  }
  
  const clearPermission = (): void => {
    userPermissions.value = []
  }
  
  return {
    permissions,
    setPermission,
    clearPermission
  }
}