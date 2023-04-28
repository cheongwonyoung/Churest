import { instance } from '.';

export const API_login = (code: any) => {
  console.log('여기');

  return instance.get(`/member/login?code=${code}`);
};
