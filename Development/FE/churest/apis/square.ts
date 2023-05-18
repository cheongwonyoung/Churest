import { instance } from '.';

// 나무 기부 현황 조회
export const getDonateInfo = (memberId: number) => {
  return instance.get(`/square?memberId=${memberId}`);
};
