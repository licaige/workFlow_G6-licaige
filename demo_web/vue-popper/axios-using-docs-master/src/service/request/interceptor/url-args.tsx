import type { RequestConfig } from '..';
import type { AxiosRequestConfig } from 'axios';
import { notification, Space, Typography } from 'antd';
import React from 'react';

const urlArgsHandler = {
  request: {
    onFulfilled: (config: AxiosRequestConfig) => {
      const { url, args } = config as RequestConfig;
      if (args) {
        const lostParams: string[] = [];
        const replacedUrl = url.replace(/\{([^}]+)\}/g, (res, arg: string) => {
          if (!args[arg]) {
            lostParams.push(arg);
          }
          return args[arg] as string;
        });
        if (lostParams.length) {
          notification.error({
            message: 'args参数缺少警告',
            description: (
              <div>
                <div>
                  内容：在args中找不到
                  <Space>
                    {lostParams.map((arg) => (
                      <Typography.Text key={arg} code>
                        {arg}
                      </Typography.Text>
                    ))}
                  </Space>
                  属性
                </div>
                <div>路径：{url}</div>
              </div>
            ),
          });
          return Promise.reject(new Error('在args中找不到对应的路径参数'));
        }
        return { ...config, url: replacedUrl };
      }
      return config;
    },
  },
};

export default urlArgsHandler;
