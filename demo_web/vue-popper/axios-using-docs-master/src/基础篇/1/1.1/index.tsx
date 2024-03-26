/**
 * defaultShowCode: true
 * hideActions: ["CSB","EXTERNAL"]
 */

import { Button } from 'antd';
import React from 'react';
import { FC, useState } from 'react';
import instance from '../../instance';

/**
 * @description 这里的请求函数用到的接口中：
 *    url为'/admins-no-wrapper',
 *    响应数据格式为{ admins: string[] }
 */
async function getAdmins() {
  const { data } = await instance.get<{ admins: string[] }>('/admins-no-wrapper');
  return data;
}

const Widget: FC<null> = () => {
  const [admins, setAdmins] = useState<string[]>([]);

  // 调用函数，展示如何调用请求函数getAdmins
  async function requestAdmins() {
    const { admins } = await getAdmins();
    setAdmins(admins);
  }

  return (
    <>
      <Button onClick={requestAdmins} type="primary">
        获取管理员
      </Button>
      <div>管理员: {admins.toString()}</div>
    </>
  );
};

export default Widget;
