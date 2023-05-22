import { instance } from '.';

// 로그인 
// TODO: 로그인 & 토큰재발급 빼고 headers 에 담기 
export const API_login = (code: any) => {
  return instance.get(`/member/login?code=${code}`);
};

// 회원가입
export const signUp = (token: string, joinInfo: any) => {
  const config = {
    headers: { 'Authorization': 'Bearer ' + token  },
  };
  return instance.post('/member/join', joinInfo, config);  
};
