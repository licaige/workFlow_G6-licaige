/**
 * defaultShowCode: true
 * hideActions: ["CSB","EXTERNAL"]
 */

import React, { ChangeEvent, useCallback } from 'react';
import { FC, useState } from 'react';
import { uploadPhoto } from './api';

const Widget: FC<null> = () => {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
    setProgress(0);
  }, []);

  const upload = useCallback(() => {
    if (fileList) {
      uploadPhoto({
        data: {
          photo: fileList,
        },
        // 此处通过onUploadProgress属性监听上传进度
        onUploadProgress: function (progressEvent) {
          setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
        },
      });
    }
  }, [fileList]);

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={upload}>上传文件</button>
      <br />
      {progress ? <div>上传进度：{progress}%</div> : null}
    </>
  );
};

export default Widget;
