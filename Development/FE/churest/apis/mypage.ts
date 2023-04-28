import { instance } from '.';

// 나의 새 목록
export const getMyBirdsList = (memberId: number) => {
  return instance.get(`/my-bird/${memberId}`);
};

// 나의 정보
export const getMyInfo = (memberId: number) => {
  return instance.get(`/my-page/${memberId}`);
};
