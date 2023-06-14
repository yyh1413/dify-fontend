/* eslint-disable */
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import router from "@/router";
import { LOGIN } from "@/constants/routerUrl";
import { authUtils, errorMessage } from "@/utils";
import api from "@/api/login/login";
import qs from "qs";

export interface HttpResponse<T> {
  code: number;
  msg: string;
  data: T;
}

let axiosTimeOut = 60 * 1000;
axios.defaults.withCredentials = true;
const baseURL = import.meta.env.VITE_API_BASE_URL;
export const instance = axios.create({
  baseURL: baseURL,
  timeout: axiosTimeOut,
  headers: {
    // "Content-Type": "application/json",
    // "Cache-Control": "no-cache",
  },
});

/**
 * 添加请求拦截器
 */
instance.interceptors.request.use(
  // 在发送请求之前做些什么
  (config: any) => {
    if (
      config.method === "post" &&
      config.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      config.data = qs.stringify(config.data);
    }
    const token = authUtils.getToken();
    if (!!token) {
      config.headers["Authorization"] = `${token}`;
    }

    return config;
  },
  // 对请求错误做些什么
  (error) => Promise.reject(error)
);
/**
 * 添加响应拦截器
 *
 */
instance.interceptors.response.use(
  //对响应数据做点什么
  (response) => successHandler(response),
  // 对响应错误做点什么
  (error) => {
    if (error.response.status === 401) {
      ssoLogout();
    } else {
      errorHandler(error);
    }
  }
);

const successHandler = (response: any) => {
  if (response.data.code !== 200) {
    tokenErrorHandler(response.data);
  }
  // if (response.data && response.data.token) {
  //   authUtils.setToken(response.data.token);
  // }

  return response;
};

const errorHandler = (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        if (error.response.data) {
          tokenErrorHandler(error.response.data);
        } else {
          router.push(LOGIN);
        }
        break;
      case 403:
        errorMessage("无权访问");
        // router.push({ pathname: AppUrl.FORBIDDEN });
        break;
      case 404:
        errorMessage("资源未找到");
        // router.push({ pathname: AppUrl.NOTFOUND });
        break;
      default:
        errorMessage("unknown error.");
        break;
    }
  }
};

const tokenErrorHandler = (data: any) => {
  switch (data.code) {
    // case 100:
    //   ssoLogout();
    //   break;
    case 302:
      errorMessage(data.msg);
      setTimeout(() => {
        ssoLogout();
      }, 500);
      break;
    // default:
    //   errorMessage('unknown error!')
    //   break;
  }
};

function ssoLogin(authCode: string) {
  return new Promise<any>((resolve, reject) => {
    instance
      .get(`/api/v1/sso/login?code=${authCode}`)
      .then((res) => {
        if (res.data && res.data.code === 0) {
          const loginInfo: any = {
            data: res.data.data,
            code: res.data.code,
            token: res.data.token,
            timestamp: res.data.timestamp,
            message: res.data.message,
          };
          resolve(loginInfo);
        } else {
          reject(res.data.message);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function ssoLogout() {
  api.logout();
}

function decorateResponseData<T extends { [index: string]: any }>(
  res: AxiosResponse<T>
): HttpResponse<T> {
  if (res.data.hasOwnProperty("code") && res.data.hasOwnProperty("msg")) {
    return {
      msg: res.data["msg"],
      code: res.data["code"],
      data: res.data["data"] as T,
    };
  }
  return {
    msg: "",
    code: 200,
    data: res.data as T,
  };
}
/**
 *get请求
 * @param url 请求的地址
 * @param data 参数是
 */
function get<T>(url: string, data?: any) {
  return new Promise<HttpResponse<T>>((resolve, reject) => {
    instance
      .get(url, {
        params: {
          ...data,
        },
      })
      .then((res) => {
        const response = decorateResponseData(res);
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 *
 * @param url 请求的地址
 * @param data 向后台传的参数
 * @param paramData 参数是数组
 */
function post<T>(url: string, data: any, contentType?: string) {
  return new Promise<HttpResponse<T>>((resolve, reject) => {
    const headers = {
      "Content-Type": contentType || "application/x-www-form-urlencoded",
    };
    instance
      .post(url, { ...data }, { headers })
      .then((res) => {
        const response = decorateResponseData(res);
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getFile<T>(url: string, data?: any) {
  return new Promise<HttpResponse<T>>((resolve, reject) => {
    instance
      .get(url, {
        responseType: "blob",
        params: {
          ...data,
        },
      })
      .then((res) => {
        const response = decorateResponseData(res);
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function uploadFile<T>(url: string, params?: any) {
  return new Promise<HttpResponse<T>>((resolve, reject) => {
    instance
      .post(url, params, { headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        const response = decorateResponseData(res);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
        errorMessage(`接口异常`);
      });
  });
}

function postFile<T>(url: string, data: any, projectId = false) {
  const project = projectId ? router.currentRoute.value.query : undefined;
  data.projectMainId = project;
  return new Promise<HttpResponse<T>>((resolve, reject) => {
    instance
      .post(url, data, { responseType: "blob" })
      .then((res) => {
        const response = decorateResponseData(res);
        if (response.code === 0) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const http = {
  get,
  post,
  ssoLogin,
  ssoLogout,
  getFile,
  postFile,
  uploadFile,
  baseURL,
};
