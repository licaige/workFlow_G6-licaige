
import { Space, Button } from 'antd';
export function renderOperations(operations = [], onAction, row = {}) {
  return (
    <Space>
      {
        operations.map(operation => (
          <Button
            key={operation.title}
            type={operation.type}
            onClick={() => onAction(operation, row)}
          >{operation.title}</Button>
        ))
      }
    </Space>
  )
}