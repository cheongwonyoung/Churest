import { instance } from '.';

// 나의 새 목록
export const getMyBirdsList = (memberId: number) => {
  return instance.get(`/my-bird/${memberId}`);
};

// 나의 정보
export const getMyInfo = (memberId: number) => {
  return instance.get(`/my-page/${memberId}`);
};

// 아바타 바꾸기
export const modifyLetter = (info: { avatarId: number; memberId: number }) => {
  return instance.put(`/my-page/avatar`, info);
};

// 닉네임 바꾸기
export const modifyNickname = (info: {
  memberId: number;
  nickname: string;
}) => {
  return instance.put(`/my-page/nickname`, info);
};

// 태그 모아보기
export const getTaggedTree = (memberId: number) => {
  return instance.get(`/tag/${memberId}`);
};
