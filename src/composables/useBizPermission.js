import { ref } from 'vue'
const userPermissions = ref([])
export const initUserPermissions = (permissions) => {
  userPermissions.value = permissions
}

export const hasPermission = (permission) => {
  return userPermissions.value.includes(permission)
}

export const useBizPermission = () => {
  const permissions = userPermissions
  
  const setPermission = (permissionList) => {
    userPermissions.value = permissionList
  }
  
  const clearPermission = () => {
    userPermissions.value = []
  }
  
  return {
    permissions,
    setPermission,
    clearPermission
  }
}
