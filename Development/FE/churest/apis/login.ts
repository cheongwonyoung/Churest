import { instance } from '.';

export const API_login = (code: any) => {
  return instance.get(`/member/login?code=${code}`);
};

export const signUp = (joinInfo: any, token: string) => {
  const config = {
    headers: { access_token: token, 'Content-Type': 'application/json' },
  };
  return instance.post('/member/update', joinInfo, config);
};
