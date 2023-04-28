import { instance } from '.';

// 추억 나무 생성
// formdata

// 추억 숲 조회
export const getForest = (memberId: number) => {
  return instance.get(`/forest/${memberId}`);
};

// 추억 나무 조회
export const getMyChurest = (memberId: number, boardId: number) => {
  return instance.get(`/forest/tree/${boardId}`);
};

// 추억 나무 물 주기
export const wateringTree = (boardId: number) => {
  return instance.get(`/forest/wateringTree/${boardId}`);
};

// 해당 위치 추억 나무 생성 가능 여부
export const checkLocation = (
  memberId: number,
  locationInfo: {
    locationX: number;
    locationY: number;
  }
) => {
  return instance.post(`/forest/${memberId}/checkLoc`, locationInfo);
};

// 추억 나무 생성 시 태그할 친구 닉네임 조회
export const getTagNickname = (memberId: number, nickname: string) => {
  return instance.get(`/forest/search/${nickname}`);
}; // ??????????

// 추억 나무 퍼가기
export const takeTree = (
  boardId: number,
  memberId: number,
  locationInfo: {
    locationX: number;
    locationY: number;
  }
) => {
  return instance.post(`/forest/takeTree/${boardId}`, locationInfo);
};
