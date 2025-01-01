import request from '@/http';

interface HttpPostLoginReq {
  username: string;
  password: string;
}

interface HttpPostLoginRes {
  userAccount: string;
  token: string;
  userId: number; 
  permissions: string[];
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

/**
 * 登录
 */
export async function httpPostLogin(data: HttpPostLoginReq) {
  return request.post<HttpPostLoginRes>('/login', data);
}

/**
 * 登出
 */
export function httpPostLogout() {
  return request.post<API.BaseHttpResult>('/user/logout');
}

