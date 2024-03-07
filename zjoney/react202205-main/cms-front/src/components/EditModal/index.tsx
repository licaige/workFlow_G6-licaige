
import { message, Modal } from 'antd';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { renderFormFields } from '@/utils/render/field';
import { request, useRequest } from 'umi';
import { useEffect } from 'react';
import { fromFieldValues } from '@/utils/fieldValues';
const form = createForm({ validateFirst: true });
export default function ({
  title, visible, onOk, onCancel, row, data = [], fields = []
}) {
  //data=[{name:'method',value:'PUT'},{name:'url',value:'/api/book/:id'}]
  const options = data.reduce((memo, item) => {
    let value = item.value;
    if (Object.keys(row).length > 0 && item.name === 'url') {
      value = value.replace(/:([^/]+)/g, (_, key) => row[key]);
    }
    memo[item.name] = value;
    return memo;
  }, {});
  const actionQuery = useRequest(({ method, url, data }) => request(url, {
    method,
    data
  }), {
    manual: true,
    onSuccess(data) {
      message.success(data.message);
    },
    formatResult(res) {
      return res;
    }
  });
  useEffect(() => {
    if (visible && row) {
      form.setValues(row);
    }
  });
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={
        () => {
          actionQuery.run({
            url: options.url,
            method: options.method,
            data: fromFieldValues(form.values)
          }).then(onOk)
        }
      }
      onCancel={onCancel}
      destroyOnClose
      maskClosable={false}
      forceRender
    >
      <FormProvider form={form}>
        {renderFormFields(fields)}
      </FormProvider>
    </Modal >
  )
}