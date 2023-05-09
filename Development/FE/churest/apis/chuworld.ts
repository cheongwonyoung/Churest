import { instance } from '.';

// 츄월드 조회
export const getChuworld = (memberId: number) => {
  return instance.get(`/chuworld?memberId=${memberId}`);
};