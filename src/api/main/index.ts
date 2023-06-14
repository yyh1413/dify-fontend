// api/user.ts
import request from "@/utils/request";
import { http } from "@/utils";
//获取我的任务
const getMyTaskDta = (param: any) => {
  return http.get<any>("/api/test1", param);
};
//冲刺 start-----------
//获取冲刺列表数据
const getSprintDta = (param: any) => {
  return http.get<any>("/api/getSprintDta", param);
};
//获取冲刺列表数据
const saveSprintData = (param: any) => {
  return http.get<any>("/api/getSprintDta", param);
};
//获取所属季度数据
const getQuarterData = () => {
  return http.get<any>("/api/getSprintDta");
};
//删除冲刺数据
const delSprintData = (param: any) => {
  return http.get<any>("/api/getSprintDta", param);
};
//冲刺 end-----------
export default {
  getMyTaskDta,
  getSprintDta,
  saveSprintData,
  getQuarterData,
  delSprintData,
};
