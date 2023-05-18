import { instance } from '.';

// 로그인 
export const API_login = (code: any) => {
  return instance.get(`/member/login?code=${code}`);
};

// 회원가입
export const signUp = (joinInfo: any) => {

  return instance.post('/member/join', joinInfo);
};
