/**
 * defaultShowCode: true
 * hideActions: ["CSB","EXTERNAL"]
 */

import { Button, Space } from 'antd';
import React from 'react';
import { FC } from 'react';
import apis from '../../service';

const Widget: FC<null> = () => {
  const getAccount1 = async () => {
    apis.standard.getAccount({
      args: {
        username: 'jenny',
      },
    });
  };

  // 这里故意少写args部分参数看反馈效果
  const getAccount2 = async () => {
    apis.standard.getAccount({
      args: {},
    });
  };

  return (
    <Space direction="vertical">
      <div>
        正常请求
        <Button type="primary" onClick={getAccount1}>
          获取账号详情
        </Button>
      </div>
      <div>
        缺少args时
        <Button type="primary" onClick={getAccount2}>
          获取账号详情
        </Button>
      </div>
    </Space>
  );
};

export default Widget;
