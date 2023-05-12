import { instance } from '.';

// 나무 기부 현황 조회
export const getDonateInfo = (memberId: number) => {
    // if (typeof memberId == 'string') {
      return instance.get(`/square?memberId=${memberId}`);
    // }
  };