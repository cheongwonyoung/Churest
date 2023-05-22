import { instance } from '.';

// 추억 나무 생성
// formdata
export const goCreateArticle = (token: string, data: any) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  };
  return instance.post('/forest', data.formData, config);
};

// 추억 숲 조회
export const getForest = (token: string, memberId: any) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  if (typeof memberId == 'string') {
    return instance.get(`/forest/${memberId}`, config);
    // return instance.get(`/forest/${memberId}`);
  }
};

// 추억 나무 조회
export const getMyChurest = (
  token: string,
  memberId: number,
  boardId: number
) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  // return instance.get(`/forest/tree/${boardId}?memberId=${memberId}`, config);
  return instance.get(`/forest/tree/${boardId}?memberId=${memberId}`);
};

// 추억 나무 물 주기
export const wateringTree = (
  token: string,
  boardId: number,
  memberId: number
) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return instance.get(`/forest/wateringTree/${boardId}/${memberId}`, config);
};

// 해당 위치 추억 나무 생성 가능 여부
export const checkLocation = (
  token: string,
  memberId: number,
  locationInfo: {
    locationX: number;
    locationY: number;
  }
) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return instance.post(`/forest/${memberId}/checkLoc`, locationInfo, config);
};

// 추억 나무 생성 시 태그할 친구 닉네임 조회
export const getTagNickname = (
  token: string,
  memberId: number,
  nickname: string
) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return instance.get(
    `/forest/search/${nickname}?memberId=${memberId}`,
    config
  );
};

// 추억 나무 퍼가기
export const takeTree = (data: {
  token: string;
  boardId: number;
  memberId: number;
  locationInfo: {
    spot: number;
  };
}) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + data.token,
    },
  };
  return instance.post(
    `/forest/takeTree/${data.boardId}?memberId=${data.memberId}`,
    data.locationInfo,
    config
  );
};
