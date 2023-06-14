import { LOGIN } from "@/constants/routerUrl";
// import { ILogin } from "@/interface/moudle/dataType";
import router from "@/router";
import {
  http,
  localStorageUtil,
} from "@/utils";

const login = (param: any) => {
  // const url = process.env.VUE_APP_SSO_URL;
  // return http.post<ILogin>(url, param, false, "application/json");
};
const logout = () => {
  // http.ssoLogout();
  localStorageUtil.clear();
  router.push(LOGIN);
  window.location.reload();
};

export default {
  login,
  logout,
};
