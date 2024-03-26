import { RcFile, UploadFile } from 'antd/lib/upload';
import { makeRequest } from '../api';

export const uploadPhotoWithAntd = makeRequest<null, { photo: UploadFile[] }>({
  url: '/photo',
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadPhoto = makeRequest<null, { photo: FileList }>({
  url: '/photo',
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
