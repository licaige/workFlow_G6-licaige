import { createForm } from '@formily/core';
import { Card, Button } from 'antd';
import { action } from '@formily/reactive'
import 'antd/dist/antd.css';
import { createSchemaField } from '@formily/react';//UI桥接层 把@formily/core 和react进行连接的一个库
import {
  Form,
  FormItem,
  FormGrid,
  FormLayout,
  Input,
  DatePicker,
  Cascader,
  Select,
  Password,
  Space,
  ArrayItems,
  Editable,
  FormButtonGroup,
  Submit
} from '@formily/antd';
//创建一个表单模型
const form = createForm({
  validateFirst: true //如果校验字段的时候，只验证第一个错误
});
const transform = (data = {}) => {
  return Object.entries(data).reduce((buf, [key, value]) => {
    if (typeof value === 'string')
      return buf.concat({
        label: value,
        value: key,
      })
    const { name, code, cities, districts } = value as any;
    const _cities = transform(cities)
    const _districts = transform(districts)
    return buf.concat({
      label: name,
      value: code,
      children: _cities.length
        ? _cities
        : _districts.length
          ? _districts
          : undefined
    })
  }, [])
}
const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    FormLayout,
    Input,
    DatePicker,
    Cascader,
    Select,
    Password,
    Space,
    ArrayItems,
    Editable
  },
  scope: {
    fetchAddress(field) {
      field.loading = true;
      fetch('//unpkg.com/china-location/dist/location.json')
        .then(res => res.json())
        .then(action.bound((data) => {
          field.dataSource = transform(data);
          field.loading = false;
        }))
    }
  }
});

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#EEE',
        padding: '40px 0'
      }}
    >
      <Card title="新用户注册" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={console.log}
        >
          <SchemaField>
            <SchemaField.String
              name="username"
              title="用户名"
              required
              x-decorator="FormItem"
              x-component="Input"
              x-component-props={{ placeholder: '请输入用户名' }}
            />
            <SchemaField.String
              name="password"
              title="密码"
              required
              x-decorator="FormItem"
              x-component="Password"
              x-component-props={{ checkStrength: true }}
              x-reactions={
                [
                  {
                    dependencies: ['confirm_password'],
                    fulfill: {
                      state: {
                        selfErrors: `{{$deps[0]&&$self.value&&$self.value!==$deps[0]?"确认密码不匹配":""}}`
                      }
                    }
                  }
                ]
              }
            />
            <SchemaField.String
              name="confirm_password"
              title="确认密码"
              required
              x-decorator="FormItem"
              x-component="Password"
              x-component-props={{ checkStrength: true }}
              x-reactions={
                [
                  {
                    dependencies: ['password'],
                    fulfill: {
                      state: {
                        selfErrors: `{{$deps[0]&&$self.value&&$self.value!==$deps[0]?"确认密码不匹配":""}}`
                      }
                    }
                  }
                ]
              }
            />
            <SchemaField.Void
              title="姓名"
              x-decorator="FormItem"
              x-component="FormGrid"
              x-decorator-props={{
                asterisk: true,
                feedbackLayout: 'none'
              }}
            >
              <SchemaField.String
                name="firstName"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{ placeholder: '姓' }}
                required
              />
              <SchemaField.String
                name="lastName"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{ placeholder: '名' }}
                required
              />
            </SchemaField.Void>
            <SchemaField.String
              name="email"
              title="邮箱"
              required
              x-decorator="FormItem"
              x-component="Input"
              x-validator="email"
              x-component-props={{ placeholder: '请输入邮箱' }}
            />
            <SchemaField.String
              name="gender"
              title="性别"
              required
              x-decorator="FormItem"
              x-component="Select"
              enum={[
                { label: '男', value: 1 },
                { label: '女', value: 0 },
              ]}
              x-component-props={{ placeholder: '请输入邮箱' }}
            />
            <SchemaField.String
              name="birthday"
              title="生日"
              required
              x-decorator="FormItem"
              x-component="DatePicker"
            />
            <SchemaField.String
              name="address"
              title="地址"
              required
              x-decorator="FormItem"
              x-component="Cascader"
              x-reactions="{{fetchAddress}}"
            />
            <SchemaField.Array
              name="contacts"
              title="联系人信息"
              required
              x-decorator="FormItem"
              x-component="ArrayItems"
            >
              <SchemaField.Object x-component="ArrayItems.Item">
                <SchemaField.Void x-decorator="FormItem" x-component="ArrayItems.SortHandle" />
                <SchemaField.Void
                  name="popover"
                  title="维护联系人信息"
                  x-decorator="Editable.Popover"
                  x-component="FormLayout"
                  x-component-props={{ layout: 'vertical' }}
                  x-reactions={[
                    {
                      dependencies: ['.name'],
                      fulfill: {
                        schema: {
                          title: '{{$deps[0]}}'
                        }
                      }
                    }
                  ]}
                >
                  <SchemaField.String
                    name="name"
                    title="姓名"
                    required
                    x-decorator="FormItem"
                    x-component="Input"
                    x-component-props={{ style: { width: 300 } }}
                  />
                </SchemaField.Void>
                <SchemaField.Void x-decorator="FormItem" x-component="ArrayItems.Remove" title="删除联系人" />
              </SchemaField.Object>
              <SchemaField.Void x-component="ArrayItems.Addition" title="新增联系人" />
            </SchemaField.Array>
          </SchemaField>
          <FormButtonGroup>
            <Submit block size="large">注册</Submit>
          </FormButtonGroup>
        </Form>
      </Card>
    </div >
  )
}