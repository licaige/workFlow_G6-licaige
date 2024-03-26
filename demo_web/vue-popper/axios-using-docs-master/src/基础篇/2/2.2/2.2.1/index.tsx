/**
 * defaultShowCode: true
 * hideActions: ["CSB","EXTERNAL"]
 */

import { Button } from 'antd';
import React from 'react';
import { FC, useState } from 'react';

import { makeRequest } from '../api';

export const register1 = makeRequest<
  null,
  // 这样子就可以定义FormData中需要的数据类型
  { username: string; password: string }
>({
  url: '/register',
  method: 'post',
  headers: {
    // 按照上面的写法修改Content-type
    'Content-Type': 'multipart/form-data',
  },
});

const Widget: FC<null> = () => {
  async function register() {
    register1({
      data: {
        username: '123',
        password: '123',
      },
    });
  }

  return (
    <>
      <Button onClick={register} type="primary">
        发送表单
      </Button>
    </>
  );
};

export default Widget;
