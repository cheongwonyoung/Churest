import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http:머시깽머시깽',
  headers: {
    'Content-Type': `application/json`,
  },
});
