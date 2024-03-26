/**
 * hideActions: ["CSB","EXTERNAL"]
 */

import { Button, Space } from 'antd';
import React from 'react';
import { FC } from 'react';
import apis from '../../service';

const Check: FC<null> = () => {
  const getAdmins1 = async () => {
    apis.standard.getAdmins();
  };

  const getAdmins2 = async () => {
    apis.standard.getAdmins({
      notifyWhenSuccess: true,
    });
  };

  const register1 = async () => {
    apis.standard.register({
      data: {
        username: '123',
        password: '123',
      },
    });
  };

  const updatePassword1 = async () => {
    apis.standard.updatePassword({
      data: {},
      params: {
        username: 'root',
      },
    });
  };

  const updatePassword2 = async () => {
    apis.standard.updatePassword({
      data: {
        password: '123',
      },
      params: {
        username: 'Tom',
      },
    });
  };

  const requestDelayTest = async () => {
    apis.standard.getDelay({
      timeout: 1000,
    });
  };

  return (
    <Space direction="vertical">
      <div>
        默认的get请求{' '}
        <Button type="primary" onClick={getAdmins1}>
          获取管理员
        </Button>
      </div>
      <div>
        带反馈的get请求{' '}
        <Button type="primary" onClick={getAdmins2}>
          获取管理员
        </Button>
      </div>

      <div>
        默认的post请求{' '}
        <Button type="primary" onClick={register1}>
          注册
        </Button>
      </div>

      <div>
        报400的put请求{' '}
        <Button type="primary" onClick={updatePassword1}>
          更改密码
        </Button>
      </div>
      <div>
        返回对象code不为0的put请求{' '}
        <Button type="primary" onClick={updatePassword2}>
          更改密码
        </Button>
      </div>

      <div>
        超时报错的请求{' '}
        <Button type="primary" onClick={requestDelayTest}>
          延时请求测试
        </Button>
      </div>
    </Space>
  );
};

export default Check;
