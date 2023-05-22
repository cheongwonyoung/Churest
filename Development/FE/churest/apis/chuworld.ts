import { instance } from '.';

// 츄월드 조회
export const getChuworld = (token: string, memberId: number) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    },
  };
  return instance.get(`/chuworld?memberId=${memberId}`, config); 
};