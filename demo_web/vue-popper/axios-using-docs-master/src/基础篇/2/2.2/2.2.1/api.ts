import { makeRequest } from '../api';

export const register1 = makeRequest<null, { username: string; password: string }>({
  url: '/register',
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
