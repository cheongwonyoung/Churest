import { instance } from '.';

// 나의 새 목록
export const getMyBirdsList = (memberId: number) => {
  return instance.get(`/my-bird?memberId=${memberId}`);
};

// 나의 정보
export const getMyInfo = (memberId: number) => {
  return instance.get(`/my-page?memberId=${memberId}`);
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

// 새 닉네임 바꾸기
export const modifyMyBird = (info: {
    memberBirdId: number,
    nickname: string;
}) => {
  return instance.put(`/my-bird`, info);
};

// 태그 모아보기
export const getTaggedTree = (memberId: number) => {
  return instance.get(`/tag/?memberId=${memberId}`);
};

// avatarNickname 중복체크
export const isCheckedNickname = (nickname: string) => {
  return instance.get(`/member/avatarNickname?nickname=${nickname}`) 
}

// birdNickname 중복체크 
export const isCheckedBirdNickname = (nickname: string) => { 
  return instance.get(`/my-bird/birdNickname?nickname=${nickname}`) 
} 