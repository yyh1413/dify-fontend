interface localStorageUtil {
  _storage: Storage;
  key: (index: number) => string | null;
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => string | null;
  removeItem(key: string): void;
  clear: () => void;
  length: () => number;

  getToken: () => string;
  setToken: (token: string) => void;

  getMenu: () => string;
  setMenu: (menu: string) => void;

  getPermission: () => string;
  setPermission: (menu: string) => void;
}

const localStorageUtil: localStorageUtil = {
  _storage: window.localStorage,
  key: function (index: number): string | any {
    return this._storage.key(index);
  },
  setItem: function (key: string, value: any) {
    this._storage.setItem(key, value);
  },
  getItem: function (key: string) {
    return this._storage.getItem(key);
  },
  removeItem: function (key: string) {
    this._storage.removeItem(key);
  },
  clear: function () {
    this._storage.clear();
  },
  length: function () {
    return this._storage.length;
  },
  getToken: function () {
    return this._storage.getItem("token") || "";
  },
  setToken: function (token: string) {
    return this._storage.setItem("token", token);
  },
  setMenu: function (menu: string) {
    return this._storage.setItem("menu", menu);
  },
  getMenu: function () {
    return this._storage.getItem("menu") || "[]";
  },
  setPermission: function (permission: string) {
    return this._storage.setItem("permission", permission);
  },
  getPermission: function () {
    return this._storage.getItem("permission") || "[]";
  },
 
};

export default localStorageUtil;
