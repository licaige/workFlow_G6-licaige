/**
 * hideActions: ["CSB","EXTERNAL"]
 */

import { Button } from 'antd';
import React from 'react';
import { FC, useState } from 'react';
import getAdmins from './api';

const Widget: FC<null> = () => {
  const [admins, setAdmins] = useState<string[]>([]);

  async function requestAdmins() {
    const { data, err } = await getAdmins();
    if (err) return;
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
