import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://k8a505.p.ssafy.io/api',
  headers: {
    'Content-Type': `application/json`,
  },
  withCredentials: true,
});

