import { instance } from '.';

export const API_login = (code: any) => {
  return instance.get(`/member/login?code=${code}`);
};
