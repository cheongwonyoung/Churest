import { instance } from '.';

// 츄월드 조회
export const getChuworld = (memberId: number, token:string) => {
  const config = {
    headers: {
      accessToken : token
    }
  }
  return instance.get(`/chuworld?memberId=${memberId}`, config);
};