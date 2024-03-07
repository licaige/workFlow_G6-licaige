import { FIELD_TYPES, BUTTON_ACTION_TYPES, BUTTON_TYPES, METHOD_TYPES } from '@/constants/enums';
export const initialEntityValues = {
  name: 'user',
  title: '用户',
  fields: [
    {
      disabled: 0,
      hideInColumn: 0,
      name: "name",
      sorter: 0,
      title: "名称",
      type: FIELD_TYPES.text
    }],
  page: [
    {
      action: BUTTON_ACTION_TYPES.add,
      title: "添加",
      type: BUTTON_TYPES.primary,
      data: [
        { name: 'url', value: '/api/user' },
        { name: 'method', value: METHOD_TYPES.POST }
      ]
    }
  ],
  record: [
    {
      action: BUTTON_ACTION_TYPES.update,
      title: "更新",
      type: BUTTON_TYPES.default,
      data: [
        { name: 'url', value: '/api/user/:id' },
        { name: 'method', value: METHOD_TYPES.PUT }
      ]
    },
    {
      action: BUTTON_ACTION_TYPES.delete,
      title: "删除",
      type: BUTTON_TYPES.primary,
      data: [
        { name: 'url', value: '/api/user/:id' },
        { name: 'method', value: METHOD_TYPES.DELETE }
      ]
    }
  ]

}