import { instance } from '.';

// 상점 새 목록
export const getShopBirdList = (token: string, memberId: number) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    }, 
  }; 
  return instance.get(`/shop/bird/?memberId=${memberId}`, config);
};

// 새 구매
export const getNewBird = (token: string, info: { birdId: number; memberId: number }) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    }, 
  }; 
  return instance.post(`/shop/bird`, info, config);
};

// 새 변경하기
export const modifyMyBird = (token: string, info: { birdId: number; memberId: number }) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    }, 
  }; 
  return instance.put(`/shop/bird`, info, config);
};

// 새 집 목록
export const getBirdHouseList = (token: string, memberId: number) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,  
    }, 
  }; 
  return instance.get(`/shop/bird-house/?memberId=${memberId}`, config);
};

// 새 집 구매
export const getNewBirdHouse = (token: string, info: {
  birdHouseId: number;
  memberId: number;
}) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,  
    }, 
  }; 
  return instance.post(`/shop/bird-house`, info, config);
};

// 새 집 바꾸기
export const modifyMyBirdHouse = (token: string, info: {
  houseId: number;
  memberId: number;
}) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    }, 
  }; 
  return instance.put(`/shop/bird-house`, info, config);
};

// 집 목록
export const getHouseList = (token: string, memberId: number) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,  
    }, 
  }; 
  return instance.get(`/shop/house/?memberId=${memberId}`, config);
};

// 집 구매
export const getNewHouse = (token: string, info: {
  houseId: number;
  memberId: number;
}) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,  
    }, 
  }; 
  return instance.post(`/shop/house`, info, config);
};

// 집 바꾸기
export const modifyMyHouse = (token: string, info: {
  houseId: number;
  memberId: number;
}) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,  
    }, 
  }; 
  return instance.put(`/shop/house`, info, config);
};
