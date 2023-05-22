import { instance } from '.';

// 나의 새 목록
export const getMyBirdsList = (token: string, memberId: number) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    }, 
  };  
  return instance.get(`/my-bird?memberId=${memberId}`, config);
};

// 나의 정보
export const getMyInfo = (token: string, memberId: number) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,  
    }, 
  };  
  return instance.get(`/my-page?memberId=${memberId}`, config);
};

// 아바타 바꾸기
export const modifyLetter = (token: string, info: { avatarId: number; memberId: number }) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    }, 
  }; 
  return instance.put(`/my-page/avatar`, info, config);
};

// 닉네임 바꾸기
export const modifyNickname = (token: string, info: {
  memberId: number;
  nickname: string;
}) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,  
    }, 
  }; 
  return instance.put(`/my-page/nickname`, info, config);
};

// 새 닉네임 바꾸기
export const modifyMyBird = (token: string, info: {
    memberBirdId: number,
    nickname: string;
}) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,  
    }, 
  }; 
  return instance.put(`/my-bird`, info, config);
};

// 태그 모아보기
export const getTaggedTree = (token: string, memberId: number) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,  
    }, 
  }; 
  return instance.get(`/tag/?memberId=${memberId}`, config);
};

// avatarNickname 중복체크
export const isCheckedNickname = (token: string, nickname: string) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    }, 
  }; 
  return instance.get(`/member/avatarNickname?nickname=${nickname}`, config) 
}

// birdNickname 중복체크 
export const isCheckedBirdNickname = (token: string, nickname: string) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    }, 
  };  
  return instance.get(`/my-bird/birdNickname?nickname=${nickname}`, config) 
} 

// fcm 수정 
export const updateFcm = (token: string, info: {
  fcm: string, 
  memberId: number,
}) => {
const config = {
  headers: {
    'Authorization': 'Bearer ' + token,  
  }, 
}; 
return instance.put(`/member/fcm?fcm=${info.fcm}&memberId=${info.memberId}`, info, config);
};
