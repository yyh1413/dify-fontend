import localStorageUtil from "./storage";
const setToken = (token: string) => {
  return localStorageUtil.setToken(token);
};

const getToken = () => {
  return localStorageUtil.getToken();
};

const setMenus = (menus: string[]) => {
  const menuString = JSON.stringify(menus);
  return localStorageUtil.setMenu(menuString);
};

const getMenus = () => {
  const menuString = localStorageUtil.getMenu();
  if (menuString) {
    return JSON.parse(menuString);
  } else {
    return "";
  }
};

const setPermissions = (permissions: string[]) => {
  const permissionString = JSON.stringify(permissions);
  return localStorageUtil.setPermission(permissionString);
};

const getPermissions = () => {
  const permissionString = localStorageUtil.getPermission();
  if (permissionString) {
    return JSON.parse(permissionString);
  } else {
    return [];
  }
};

const setOrgPermissions = (orgPermission: any[]) => {
  return localStorageUtil.setItem(
    "orgPermission",
    JSON.stringify(orgPermission)
  );
};

const getOrgPermissions = () => {
  const permissions = localStorageUtil.getItem("orgPermission") || "[]";
  return JSON.parse(permissions);
};

const isLoggedIn = (): boolean => {
  return !!getToken();
};
const getUserInfo = () => {
  const token = getToken();
  if (token) {
    const strings = token.split(".");
    return JSON.parse(
      decodeURIComponent(
        escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))
      )
    );
  } else {
    return undefined;
  }
};
const getUserId = (): string => {
  return getUserInfo()?.id || "";
};
//用户白名单
export const getWhiteUser = (): boolean => {
  const whiteList = ["admin"];
  return whiteList.includes(getUserInfo().username);
};

const AuthUtils = {
  setToken,
  getToken,
  getMenus,
  setMenus,
  getPermissions,
  setPermissions,
  getOrgPermissions,
  setOrgPermissions,
  isLoggedIn,
  getUserInfo,
  getUserId,
};

export default AuthUtils;
