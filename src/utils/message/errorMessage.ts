import { ElMessage } from "element-plus";

export const errorMessage = (message: string): void => {
  ElMessage({
    showClose: true,
    message: message,
    grouping: true,
    type: "error",
  });
};
export const successMessage = (message: string): void => {
  ElMessage({
    showClose: true,
    message: message,
    grouping: true,
    type: "success",
  });
};

export const warningMessage = (message: string): void => {
  ElMessage({
    showClose: true,
    message: message,
    grouping: true,
    type: "warning",
  });
};
