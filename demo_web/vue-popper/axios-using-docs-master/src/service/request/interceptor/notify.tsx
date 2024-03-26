import { notification } from 'antd';
import type { AxiosResponse, AxiosError } from 'axios';
import React from 'react';
import type { BackendResultFormat, RequestConfig } from '..';

const notify = {
  response: {
    onFulfilled: (response: AxiosResponse<BackendResultFormat>) => {
      const { code, message } = response.data;
      const { desc, notifyWhenFailure, notifyWhenSuccess, method } =
        response.config as RequestConfig;
      if (desc) {
        // 对code为0的响应做成功反馈
        if (code === 0) {
          if (notifyWhenSuccess !== false) {
            if (
              ['delete', 'put', 'post'].includes(method?.toLowerCase() || '') ||
              notifyWhenSuccess === true
            ) {
              notification.success({
                message: `${desc}成功`,
              });
            }
          }
          // 针对code不为0的响应做失败反馈
        } else if (notifyWhenFailure !== false) {
          notification.error({
            message: `${desc}错误`,
            description: `原因：${message}`,
          });
        }
      }
      return response;
    },
    onRejected: (error: AxiosError<BackendResultFormat>) => {
      const { response, config } = error;
      // 对4xx，5xx状态码做失败反馈
      const { url, desc } = config as RequestConfig;
      if (desc) {
        if (response?.status && response?.statusText) {
          notification.error({
            message: `${desc}错误`,
            description: (
              <div>
                <div>
                  状态：{response.status}~{response.statusText}
                </div>
                <div>路径：{url}</div>
                {/*可能存在后端直接返回错误码，但没返回对象的情况*/}
                {response.data?.message && <div>原因：{response.data.message}</div>}
              </div>
            ),
          });
        } else {
          // 处理请求响应失败,例如网络offline，超时等做失败反馈
          notification.error({
            message: `${desc}失败`,
            description: (
              <div>
                <div>原因：{error.message}</div>
                <div style={{ whiteSpace: 'nowrap' }}>路径：{url}</div>
              </div>
            ),
          });
        }
      }
      return error;
    },
  },
};

export default notify;
