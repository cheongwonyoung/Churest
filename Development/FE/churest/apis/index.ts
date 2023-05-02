import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://k8a505.p.ssafy.io:8080/api',
  headers: {
    'Content-Type': `application/json`,
  },
});
