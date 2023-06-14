// api/user.ts
import request from '@/utils/request';

const base = import.meta.env.VITE_API_BASE_URL;

const Login = (data: { [key: string]: any }) => {
  return request.post( '/sys/login', data);
};

const getDict = (data?: any) => {
  return request.get('/config-saas/sysDict/tree', data);
};

const getTest = () => {
  return request.get('/api/test')
}

export default {
  base,
  Login,
  getDict,
  getTest
};
