import { FIELD_TYPES } from '../../constants/enums';
import moment from 'moment';
import { Tag, Space } from 'antd';
import { renderOperations } from './operation';
function customRenderColumn(column) {
  switch (column.type) {
    case FIELD_TYPES.datetime:
      column.render = (value) => moment(value).format('YYYY-MM-DD HH:mm:ss')
      break;
    case FIELD_TYPES.switch:
      column.render = (value) => {
        const { title } = column.data.find(item => item.value === value);
        return <Tag>{title}</Tag>
      }
      break;
    default:
      break;
  }
}
export function renderColumns(data: any = {}, onAction) {
  if (data) {
    const { fields = [], record = [] } = data;
    return fields
      .filter(field => !field.hideInColumn)//此字段是否在列中隐藏
      .map(field => {
        const column = { ...field };
        customRenderColumn(column);
        column.key = column.dataIndex = field.name;
        return column;
      }).concat({
        title: '操作',
        dateIndex: 'operations',
        key: 'operations',
        render(_, row) {
          return renderOperations(record, onAction, row);
        }
      })
  }
}