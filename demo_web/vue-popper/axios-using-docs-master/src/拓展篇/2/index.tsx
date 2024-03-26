/**
 * defaultShowCode: true
 * hideActions: ["CSB","EXTERNAL"]
 */

import { Button, Space } from 'antd';
import React from 'react';
import { FC, useCallback, useState } from 'react';
import apis from '../../service';

const Widget: FC<null> = () => {
  const [admins1, setAdmins1] = useState<string[]>([]);
  const [admins2, setAdmins2] = useState<string[]>([]);

  const getAdmins1 = useCallback(async () => {
    const { err, data } = await apis.standard.getAdmins();
    if (err) return;
    setAdmins1(data!.admins);
  }, []);

  const getAdmins2 = useCallback(async () => {
    const { err, data } = await apis.standard.getAdmins({
      // 此处配置用缓存
      cache: true,
    });
    if (err) return;
    setAdmins2(data!.admins);
  }, []);

  return (
    <Space direction="vertical">
      <div>
        默认请求：
        <Button type="primary" onClick={getAdmins1}>
          获取管理员
        </Button>
      </div>
      <div>{admins1.toString()}</div>
      <div>
        带缓存：
        <Button type="primary" onClick={getAdmins2}>
          获取管理员
        </Button>
      </div>
      <div>{admins2.toString()}</div>
    </Space>
  );
};

export default Widget;
