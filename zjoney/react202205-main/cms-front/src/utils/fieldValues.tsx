import moment from 'moment';
//转成字段的值
export function toFieldValues(values) {
  return values;
}
//把字段的传转成能传给后台形式
export function fromFieldValues(values) {
  let newValues = { ...values };
  for (let key in values) {
    if (key === 'created' || key === 'updated') {
      newValues[key] = moment(values[key]).format('YYYY-MM-DD HH:mm:ss')
    }
  }
  return newValues;
}