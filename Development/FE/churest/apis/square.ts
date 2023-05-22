import { instance } from '.';

// 나무 기부 현황 조회
export const getDonateInfo = (token: string, memberId: number) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return instance.get(`/square?memberId=${memberId}`, config);
};
