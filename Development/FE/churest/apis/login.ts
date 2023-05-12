import { instance } from '.';

export const API_login = (code: any) => {
  return instance.get(`/member/login?code=${code}`);
};

export const signUp = (joinInfo: any) => {
  // const config = {
  //   headers: { 'X-AUTH-TOKEN': token },
  // };

  return instance.post('/member/join', joinInfo);
};
