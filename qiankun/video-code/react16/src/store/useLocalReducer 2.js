import { useReducer } from 'react'
import { initialState } from './state'
import { reducer } from './reducer'

export const useLocalReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 重写dispatch方法
  const newDispatch = (type = '', data) => {
    dispatch({
      type,
      [type]: data
    })
  }

  return [state, newDispatch]
}
