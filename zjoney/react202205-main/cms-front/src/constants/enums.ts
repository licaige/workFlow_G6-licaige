export enum FIELD_TYPES {
  text = 'text',//=>varchar(255)
  number = 'number',//int
  select = "select",//int
  datetime = 'datetime',//datetime
  switch = 'switch'//tinyint
}

export enum BUTTON_TYPES {
  default = 'default',
  primary = 'primary'
}

export enum BUTTON_ACTION_TYPES {
  add = 'add',
  update = 'update',
  delete = 'delete',
  refresh = 'refresh'
}

export enum METHOD_TYPES {
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  GET = 'GET'
}

export const FIELD = [
  { label: '文本', value: FIELD_TYPES.text },
  { label: '数字', value: FIELD_TYPES.number },
  { label: '下拉框', value: FIELD_TYPES.select },
  { label: '日期时间', value: FIELD_TYPES.datetime },
  { label: '开关', value: FIELD_TYPES.switch }
]
export const BUTTON = [
  { label: '默认', value: BUTTON_TYPES.default },
  { label: '主要', value: BUTTON_TYPES.primary }
]
export const BUTTON_ACTION = [
  { label: '增加', value: BUTTON_ACTION_TYPES.add },
  { label: '更新', value: BUTTON_ACTION_TYPES.update },
  { label: '删除', value: BUTTON_ACTION_TYPES.delete },
  { label: '刷新', value: BUTTON_ACTION_TYPES.refresh }
]
export const METHOD = [
  { label: METHOD_TYPES.POST, value: METHOD_TYPES.POST },
  { label: METHOD_TYPES.DELETE, value: METHOD_TYPES.DELETE },
  { label: METHOD_TYPES.PUT, value: METHOD_TYPES.PUT },
  { label: METHOD_TYPES.GET, value: METHOD_TYPES.GET }
]