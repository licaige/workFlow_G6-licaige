/**
 * defaultShowCode: true
 * hideActions: ["CSB","EXTERNAL"]
 */
import { Button } from 'antd';
import React from 'react';
import { FC, useState } from 'react';
import instance from '../../../instance';

// 这种写法下的getAdmins有两种返回情况：
//  1. 无报错时：Promise<{err: null, data: {admins: string[]},response: AxiosResponse }>
//  2. 报错时：Promise<{err: err, data: null, response: null }>
async function getAdmins() {
  // 用try~catch来捕捉错误
  try {
    const response = await instance.get<{ admins: string[] }>('/admins-no-wrapper');
    const { data } = response;
    return { data, err: null, response };
  } catch (err) {
    return { data: null, err, response: null };
  }
}

// 当我们调用getAdmins，可用以下写法
const Widget: FC<null> = () => {
  const [admins, setAdmins] = useState<string[]>([]);
  // 当我们调用getAdmins，可用以下写法
  async function requestAdmins() {
    // 这里不需要用到response，所以就没解构出response出来
    const { data, err } = await getAdmins();
    // 处理错误
    if (err) {
      // 此时data为null值，因此直接return跳出函数，避免继续执行下面的逻辑导致报错
      return;
    }
    // 处理数据
    // 注意data在这一步里是真值而非null，但data的ts声明类型中包含null值
    // 因此用!强制声明该变量不会是null和undefined
    setAdmins(data!.admins);
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
