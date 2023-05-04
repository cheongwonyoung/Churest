import { instance } from '.';

//  친구 검색
export const searchFriend = (memberId: number, nickname: string) => {
    return instance.get(`/forest/search/${nickname}?memberId=${memberId}`);
};

// 태그 모아보기
export const getTaggedTree = (memberId: number) => {
    return instance.get(`/tag/?memberId=${memberId}`);
};