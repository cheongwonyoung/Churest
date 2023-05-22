import { instance } from '.';

//  친구 검색
export const searchFriend = (token: string, memberId: number, nickname: string) => {
    const config = {
        headers: {
          'Authorization': 'Bearer ' + token, 
        }, 
      }; 
    return instance.get(`/forest/search/${nickname}?memberId=${memberId}`, config);
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