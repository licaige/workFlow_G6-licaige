import React from 'react';
import * as types from './store/action-types';
import { useSelector, useDispatch } from 'react-redux';
function Counter() {
  const number = useSelector(state => state.number)
  const dispatch = useDispatch();
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => dispatch({ type: types.ADD })}>+</button>
      <button onClick={() => dispatch({ type: types.ASYNC_ADD })}>asyncAdd</button>
      <button onClick={() => dispatch({ type: types.STOP_ADD })}>STOP_ADD</button>
    </div>
  )
}
export default Counter;