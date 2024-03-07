import { PageContainer } from "@ant-design/pro-components";
import { FormProvider, createSchemaField } from '@formily/react';
import { createForm, onFieldValueChange, FormPath } from '@formily/core';
import { Card, InputNumber } from 'antd';
import { FormItem, Editable, Input, ArrayTable, Select, Checkbox, Switch, FormLayout, FormGrid, FormButtonGroup, Submit } from '@formily/antd'
import { useRequest, request, useLocation } from 'umi';
import { FIELD, BUTTON, BUTTON_ACTION, BUTTON_ACTION_TYPES, METHOD } from '@/constants/enums';
import { initialEntityValues } from './initValue';
import { useMount } from "ahooks";
import Qs from 'query-string';
const { parse } = FormPath;
const SchemaField = createSchemaField({
  components: {
    FormItem, Editable, Input, ArrayTable, Select, Checkbox, Switch, FormLayout, Card, FormGrid, InputNumber
  }
});
const form = createForm({
  effects(form) {
    onFieldValueChange('name', ({ value }) => {
      form.setFieldState('*(page.*.data,record.*.data)', (state: any) => {
        let dataValue = form.getValuesIn(state.address.entire);
        for (let item of dataValue) {
          if (item.name === 'url') {
            let action = form.getValuesIn(parse('.action', state.address.entire).entire);
            item.value = getUrl(action, value);
          }
        }
      });
    });
    function getUrl(action, value) {
      switch (action) {
        case BUTTON_ACTION_TYPES.add:
          return `/api/${value}`;
        case BUTTON_ACTION_TYPES.update:
          return `/api/${value}/:id`;
        case BUTTON_ACTION_TYPES.delete:
          return `/api/${value}/:id`;
      }
    }
  },
  initialValues: initialEntityValues
});
export default function () {
  const location = useLocation();
  const query = Qs.parse(location.search);
  const loadQuery = useRequest((id) => request(`/api/entity/${id}`, {
    method: 'GET'
  }), {
    manual: true,
    onSuccess(data) {
      form.setValues(data);
    }
  });
  const updateQuery = useRequest((id, values) => request(`/api/entity/${id}`, {
    method: 'PUT',
    data: values
  }), {
    manual: true, onSuccess() {
      history.back();
    }
  });
  const addQuery = useRequest((values) => request(`/api/entity`, {
    method: 'POST',
    data: values
  }), {
    manual: true, onSuccess() {
      history.back();
    }
  });
  useMount(() => {
    if (query.id) {
      loadQuery.run(query.id);
    } else {
      form.setValues(initialEntityValues)
    }
  });
  const handleSubmit = (values) => {
    if (query.id) {
      updateQuery.run(query.id, values);
    } else {
      addQuery.run(values);
    }
  }
  return (
    <PageContainer>
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, minColumns: 2 }} >
            <SchemaField.String name="name" title="名称" x-decorator="FormItem" required x-component="Input" />
            <SchemaField.String name="title" title="标题" x-decorator="FormItem" required x-component="Input" />
          </SchemaField.Void>
          <SchemaField.Array name="fields" x-decorator="FormItem" x-component="ArrayTable">
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '排序', align: 'center' }}>
                <SchemaField.Void x-component="ArrayTable.SortHandle" />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '索引', align: 'center' }}>
                <SchemaField.Void x-component="ArrayTable.Index" />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '名称', align: 'center', width: 80 }}>
                <SchemaField.String x-component="Input" required x-decorator="FormItem" name="name" />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '标题', align: 'center', width: 80 }}>
                <SchemaField.String x-component="Input" required x-decorator="FormItem" name="title" />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '类型', align: 'center' }}>
                <SchemaField.String x-component="Select" required x-decorator="FormItem" name="type" enum={FIELD} />
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '配置字段数据', align: 'center' }}>
                <SchemaField.Array
                  name="data"
                  x-decorator="Editable.Popover"
                  x-component="ArrayTable"
                  x-component-props={{
                    pagination: { pageSize: 10 },
                    scroll: { x: '100%' },
                  }}
                  x-reactions={
                    (field: any) => {
                      let value = field.getState().value;
                      if (value.length > 0) {
                        field.title = value.map(item => item.title).join(',');
                      }
                    }
                  }
                >
                  <SchemaField.Object>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{ title: 'Sort', align: 'center' }}
                    >
                      <SchemaField.Void
                        x-decorator="FormItem"
                        required
                        x-component="ArrayTable.SortHandle"
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{ title: '标题', dataIndex: 'title' }}
                    >
                      <SchemaField.String
                        name="title"
                        x-decorator="Editable"
                        required
                        x-component="Input"
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{ title: '值' }}
                    >
                      <SchemaField.String
                        x-decorator="FormItem"
                        name="value"
                        required
                        x-component="InputNumber"
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: '操作',
                        dataIndex: 'operations',
                        width: 200,
                        fixed: 'right',
                      }}
                    >
                      <SchemaField.Void x-component="FormItem">
                        <SchemaField.Void x-component="ArrayTable.Remove" />
                        <SchemaField.Void x-component="ArrayTable.MoveDown" />
                        <SchemaField.Void x-component="ArrayTable.MoveUp" />
                      </SchemaField.Void>
                    </SchemaField.Void>
                  </SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Addition"
                    title="添加数据"
                  />
                </SchemaField.Array>
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '是否支持排序' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="sorter"
                  required
                  x-component="Switch"
                  x-reactions={{
                    "dependencies": [".type"],
                    "when": "{{$deps[0] === 'number'}}",
                    fulfill: {
                      state: {
                        value: true
                      }
                    },
                    otherwise: {
                      state: {
                        value: false
                      }
                    }
                  }}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '是否在列表中隐藏' }}
              >
                <SchemaField.Number
                  x-decorator="FormItem"
                  name="hideInColumn"
                  x-component="Switch"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  title: '操作',
                  dataIndex: 'operations',
                  fixed: 'right',
                }}
              >
                <SchemaField.Void x-component="FormItem">
                  <SchemaField.Void x-component="ArrayTable.Remove" />
                  <SchemaField.Void x-component="ArrayTable.MoveDown" />
                  <SchemaField.Void x-component="ArrayTable.MoveUp" />
                </SchemaField.Void>
              </SchemaField.Void>
            </SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Addition"
              title="添加字段"
            />
          </SchemaField.Array>

          <SchemaField.Array name="page" x-decorator="FormItem" x-component="ArrayTable">
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '排序', align: 'center' }}>
                <SchemaField.Void x-component="ArrayTable.SortHandle" />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '索引', align: 'center' }}>
                <SchemaField.Void x-component="ArrayTable.Index" />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '标题', align: 'center', width: 100 }}>
                <SchemaField.String x-component="Input" required x-decorator="FormItem" name="title" />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '类型', align: 'center' }}>
                <SchemaField.String x-component="Select" required x-decorator="FormItem" name="type" enum={BUTTON} />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '操作', align: 'center' }}>
                <SchemaField.String x-component="Select" required x-decorator="FormItem" name="action" enum={BUTTON_ACTION} />
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '配置页面数据', align: 'center' }}>
                <SchemaField.Array
                  name="data"
                  x-decorator="Editable.Popover"
                  x-component="ArrayTable"
                  x-component-props={{
                    pagination: { pageSize: 10 },
                    scroll: { x: '100%' },
                  }}
                  x-reactions={
                    (field: any) => {
                      let value = field.getState().value;
                      if (value.length > 0) {
                        field.title = value.map(item => item.name).join(',');
                      }
                    }
                  }
                >
                  <SchemaField.Object>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{ title: 'Sort', align: 'center' }}
                    >
                      <SchemaField.Void
                        x-decorator="FormItem"
                        required
                        x-component="ArrayTable.SortHandle"
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{ title: '名称', dataIndex: 'name' }}
                    >
                      <SchemaField.String
                        name="name"
                        x-decorator="FormItem"
                        required
                        x-component="Input"
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{ title: '值' }}
                    >
                      <SchemaField.String
                        x-decorator="FormItem"
                        name="value"
                        required
                        x-component="Input"
                        x-reactions={{
                          dependencies: [".name"],
                          when: "{{$deps[0] === 'method'}}",
                          fulfill: {
                            schema: {
                              'x-component': "Select",
                              enum: METHOD
                            }
                          },
                          otherwise: {
                            schema: {
                              'x-component': "Input"
                            }
                          }
                        }}
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: '操作',
                        dataIndex: 'operations',
                        width: 200,
                        fixed: 'right',
                      }}
                    >
                      <SchemaField.Void x-component="FormItem">
                        <SchemaField.Void x-component="ArrayTable.Remove" />
                        <SchemaField.Void x-component="ArrayTable.MoveDown" />
                        <SchemaField.Void x-component="ArrayTable.MoveUp" />
                      </SchemaField.Void>
                    </SchemaField.Void>
                  </SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Addition"
                    title="添加数据"
                  />
                </SchemaField.Array>
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  title: '操作',
                  dataIndex: 'operations',
                  fixed: 'right',
                }}
              >
                <SchemaField.Void x-component="FormItem">
                  <SchemaField.Void x-component="ArrayTable.Remove" />
                  <SchemaField.Void x-component="ArrayTable.MoveDown" />
                  <SchemaField.Void x-component="ArrayTable.MoveUp" />
                </SchemaField.Void>
              </SchemaField.Void>
            </SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Addition"
              title="添加页面级操作按钮"
            />
          </SchemaField.Array>

          <SchemaField.Array name="record" x-decorator="FormItem" x-component="ArrayTable">
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '排序', align: 'center' }}>
                <SchemaField.Void x-component="ArrayTable.SortHandle" />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '索引', align: 'center' }}>
                <SchemaField.Void x-component="ArrayTable.Index" />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '标题', align: 'center', width: 100 }}>
                <SchemaField.String x-component="Input" required x-decorator="FormItem" name="title" />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '类型', align: 'center' }}>
                <SchemaField.String x-component="Select" required x-decorator="FormItem" name="type" enum={BUTTON} />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '操作', align: 'center' }}>
                <SchemaField.String x-component="Select" required x-decorator="FormItem" name="action" enum={BUTTON_ACTION} />
              </SchemaField.Void>
              <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '配置记录数据', align: 'center' }}>
                <SchemaField.Array
                  name="data"
                  x-decorator="Editable.Popover"
                  x-component="ArrayTable"
                  x-component-props={{
                    pagination: { pageSize: 10 },
                    scroll: { x: '100%' },
                  }}
                  x-reactions={
                    (field: any) => {
                      let value = field.getState().value;
                      if (value.length > 0) {
                        field.title = value.map(item => item.name).join(',');
                      }
                    }
                  }
                >
                  <SchemaField.Object>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{ title: 'Sort', align: 'center' }}
                    >
                      <SchemaField.Void
                        x-decorator="FormItem"
                        required
                        x-component="ArrayTable.SortHandle"
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{ title: '名称', dataIndex: 'name' }}
                    >
                      <SchemaField.String
                        name="name"
                        x-decorator="FormItem"
                        required
                        x-component="Input"
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{ title: '值' }}
                    >
                      <SchemaField.String
                        x-decorator="FormItem"
                        name="value"
                        required
                        x-component="Input"
                        x-reactions={{
                          dependencies: [".name"],
                          when: "{{$deps[0] === 'method'}}",
                          fulfill: {
                            schema: {
                              'x-component': "Select",
                              enum: METHOD
                            }
                          },
                          otherwise: {
                            schema: {
                              'x-component': "Input"
                            }
                          }
                        }}
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: '操作',
                        dataIndex: 'operations',
                        width: 200,
                        fixed: 'right',
                      }}
                    >
                      <SchemaField.Void x-component="FormItem">
                        <SchemaField.Void x-component="ArrayTable.Remove" />
                        <SchemaField.Void x-component="ArrayTable.MoveDown" />
                        <SchemaField.Void x-component="ArrayTable.MoveUp" />
                      </SchemaField.Void>
                    </SchemaField.Void>
                  </SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Addition"
                    title="添加数据"
                  />
                </SchemaField.Array>
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  title: '操作',
                  dataIndex: 'operations',
                  fixed: 'right',
                }}
              >
                <SchemaField.Void x-component="FormItem">
                  <SchemaField.Void x-component="ArrayTable.Remove" />
                  <SchemaField.Void x-component="ArrayTable.MoveDown" />
                  <SchemaField.Void x-component="ArrayTable.MoveUp" />
                </SchemaField.Void>
              </SchemaField.Void>
            </SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Addition"
              title="添加记录级操作按钮"
            />
          </SchemaField.Array>
        </SchemaField>
        <FormButtonGroup>
          <Submit onSubmit={handleSubmit}>提交</Submit>
        </FormButtonGroup>
      </FormProvider>
    </PageContainer>
  )
}
//实体设计
//实体的名称 标题 book  书籍
//实体有哪些字段 字段是什么类型 用什么编辑组件进行编辑 而且还有一些额外的数据
//页面级的按钮 添加
//记录级的按钮 更新 删除