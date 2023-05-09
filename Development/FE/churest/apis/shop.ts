import { instance } from '.';

// 상점 새 목록
export const getShopBirdList = (memberId: number) => {
  return instance.get(`/shop/bird/?memberId=${memberId}`);
};

// 새 구매
export const getNewBird = (info: { birdId: number; memberId: number }) => {
  return instance.post(`/shop/bird`, info);
};

// 새 변경하기
export const modifyMyBird = (info: { birdId: number; memberId: number }) => {
  return instance.put(`/shop/bird`, info);
};

// 새 집 목록
export const getBirdHouseList = (memberId: number) => {
  return instance.get(`/shop/bird-house/?memberId=${memberId}`);
};

// 새 집 구매
export const getBirdHouse = (info: {
  birdHouseId: number;
  memberId: number;
}) => {
  return instance.post(`/shop/bird-house`, info);
};

// 새 집 바꾸기
export const modifyBirdHouse = (info: {
  houseId: number;
  memberId: number;
}) => {
  return instance.put(`/shop/bird-house`, info);
};

// 집 목록
export const getHouseList = (memberId: number) => {
  return instance.get(`/shop/house/?memberId=${memberId}`);
};

// 집 구매
export const getHouse = (info: {
  houseId: number;
  memberId: number;
}) => {
  return instance.post(`/shop/house`, info);
};

// 집 바꾸기
export const modifyHouse = (info: {
  houseId: number;
  memberId: number;
}) => {
  return instance.put(`/shop/house`, info);
};
