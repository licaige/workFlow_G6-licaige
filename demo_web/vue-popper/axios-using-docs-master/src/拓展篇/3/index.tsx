/**
 * hideActions: ["CSB","EXTERNAL"]
 */

import { Button, Space } from 'antd';
import React from 'react';
import { FC } from 'react';
import apis from '../../service';

const Widget: FC<null> = () => {
  return (
    <Space direction="vertical">
      <div>
        延时请求测试：<Button onClick={() => apis.advanced.getDelayWithRetry()}>发出请求</Button>
      </div>
      <div>
        500错误请求测试：<Button onClick={() => apis.advanced.get500Error()}>发出请求</Button>
      </div>
    </Space>
  );
};

export default Widget;
