/**
 * 把json对象拆成url参数格式的方法
 * @data 需要处理的json对象
 */
const getParam = (data: any) => {
  let url = "";
  for (const k in data) {
    const value = data[k] !== undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : "";
};
/**
 * //获取带参数的url方法 将参数拼到url后面
 * @param url  url;
 * @param data 参数
 * @returns  拼接后的url
 */
export const urlEncode = (url: string, data: any) => {
  //看原始url地址中开头是否带?，然后拼接处理好的参数
  return (url += (url.indexOf("?") < 0 ? "?" : "") + getParam(data));
};
/**
 * json串转form表单格式
 * @param param  json对象;
 * @param data 参数
 * @returns  拼接后的url
 */
export const jsonToFormData = (param: any): FormData => {
  const formData = new FormData();
  Object.keys(param).forEach((key) => {
    undefined;
    formData.append(key, param[key]);
  });
  return formData;
};
//获取url后面的参数
export const getQueryString = () => {
  const qs = new URLSearchParams(window.location.search);
  const obj: any = {};

  for (const p of qs.entries()) {
    obj[p[0]] = p[1];
  }

  return obj;
};
