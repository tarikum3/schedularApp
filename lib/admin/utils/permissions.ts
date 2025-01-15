import { PERMISSIONS } from 'configs/permissions';
import { Role } from './enums';
import { User } from 'types/auth.type';


// Function to return values based on user permissions
export const permissionArray = (
  permission: PERMISSIONS | PERMISSIONS[],
  value: object | any[],
  permissions: any[],
  user?: User | null,
) => {
  // allow superAdmin to access all values
  if (user?.roleType === Role.superAdmin) {
    return Array.isArray(value) ? value : [value];
  }

  if (permission === PERMISSIONS.ALL) {
    return Array.isArray(value) ? value : [value];
  }
    

  if (Array.isArray(permission) &&  permission.length !== 0) {
    return permission.every((p) => permissions.includes(p)) ? [value] : [];

  } else if (permissions.includes(permission)) {
    return Array.isArray(value) ? value : [value];
  } else {
    return [];
  }
};

// Function to return a value or default value based on user permissions
export const permissionsCondition = (
  permission: PERMISSIONS | PERMISSIONS[],
  value: any,
  permissions: any[],
  user?: User | null,
  defaultValue?: any,
) => {

  if (user?.roleType === Role.superAdmin) {
    return value;
  }

  if (permission === PERMISSIONS.ALL) return value;

  if (Array.isArray(permission)) {
    return permission.some((item) => permissions.includes(item)) ? value : defaultValue || null;
  } else {
    return permissions.includes(permission) ? value : defaultValue || null;
  }
};


export const checkSinglePermission = (
  permission: PERMISSIONS | PERMISSIONS[],
  value: any,
  permissions: any[],
  user?: User | null,
  defaultValue?: any
) => {

  if (user?.roleType === Role.superAdmin) {
    return value;
  }

  if (permission === PERMISSIONS.ALL) {
    return value;
  }

  if (Array.isArray(permission)) {
    return permission.some((perm) => permissions.includes(perm)) ? value : defaultValue || null;
  } else {
    return permissions.includes(permission) ? value : defaultValue || null;
  }
};

