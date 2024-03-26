/**
 * defaultShowCode: true
 * hideActions: ["CSB","EXTERNAL"]
 */
import { Button, Space } from 'antd';
import React from 'react';
import { FC } from 'react';
import apis from '../../service';

const Widget: FC<null> = () => {
  //1. 没有限流的请求
  const request1 = async () => {
    apis.standard.getDelay();
  };

  //2. 限制并发数为1的请求
  const request2 = async () => {
    apis.standard.getDelay({
      limit: 1,
    });
  };

  //3. 限制并发数为2的请求
  const request3 = async () => {
    apis.standard.getDelay({
      limit: 2,
    });
  };

  return (
    <Space direction="vertical">
      <div>
        正常请求
        <Button type="primary" onClick={request1}>
          发出请求
        </Button>
      </div>
      <div>
        限流数量：1
        <Button type="primary" onClick={request2}>
          发出请求
        </Button>
      </div>
      <div>
        限流数量：2
        <Button type="primary" onClick={request3}>
          发出请求
        </Button>
      </div>
    </Space>
  );
};

export default Widget;
