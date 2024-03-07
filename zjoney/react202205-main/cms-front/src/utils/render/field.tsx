import { createSchemaField } from '@formily/react';
import { Card, InputNumber } from 'antd';
import { FormItem, Editable, Input, ArrayTable, Select, Checkbox, Switch, FormLayout, FormGrid, DatePicker, Submit } from '@formily/antd'
import { FIELD_TYPES } from '@/constants/enums';
import moment from 'moment';
const SchemaField = createSchemaField({
  components: {
    FormItem, DatePicker, Editable, Input, ArrayTable, Select, Checkbox, Switch, FormLayout, Card, FormGrid, InputNumber
  }
});

export function renderSearchFormFields(fields) {
  return (
    <SchemaField>
      {
        fields.map(field => {
          switch (field.type) {
            case FIELD_TYPES.datetime:
              return (
                <SchemaField.String
                  name={field.name}
                  title={field.title}
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 2 }}
                  x-component="DatePicker.RangePicker"
                  x-component-props={{
                    showTime: true,
                    ranges: {
                      '今天': [moment().startOf('day'), moment().endOf('day')],
                      '本月': [moment().startOf('month'), moment().endOf('month')],
                      '上周': [moment().subtract(7, 'days'), moment()],
                      '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    }
                  }}
                />
              )
            case FIELD_TYPES.switch:
              return (
                <SchemaField.Number
                  name={field.name}
                  title={field.title}
                  x-decorator="FormItem"
                  x-component="Switch"
                />
              )
            case FIELD_TYPES.number:
              return (
                <SchemaField.Number
                  name={field.name}
                  title={field.title}
                  x-decorator="FormItem"
                  x-component="InputNumber"
                />
              )
            default:
              return (
                <SchemaField.Number
                  name={field.name}
                  title={field.title}
                  x-decorator="FormItem"
                  x-component="Input"
                />
              )
          }
        })
      }
    </SchemaField>
  )
}
export function renderFormFields(fields) {
  return (
    <SchemaField>
      {
        fields.map(field => {
          switch (field.type) {
            case FIELD_TYPES.datetime:
              return (
                <SchemaField.String
                  name={field.name}
                  title={field.title}
                  x-decorator="FormItem"
                  x-component="DatePicker"
                  x-component-props={{ showTime: true }}
                />
              )
            case FIELD_TYPES.switch:
              return (
                <SchemaField.Number
                  name={field.name}
                  title={field.title}
                  x-decorator="FormItem"
                  x-component="Switch"
                />
              )
            case FIELD_TYPES.number:
              return (
                <SchemaField.Number
                  name={field.name}
                  title={field.title}
                  x-decorator="FormItem"
                  x-component="InputNumber"
                />
              )
            default:
              return (
                <SchemaField.Number
                  name={field.name}
                  title={field.title}
                  x-decorator="FormItem"
                  x-component="Input"
                />
              )
          }
        })
      }
    </SchemaField>
  )
}