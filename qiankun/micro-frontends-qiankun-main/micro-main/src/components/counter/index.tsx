
import { useAppSelector, useAppDispatch } from 'store'
import { counterActions } from 'store/counter'

const { increment, decrement } = counterActions

export function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const handleIncrement = () => {
    dispatch(increment())
  }

  const handleDecrement = () => {
    dispatch(decrement())
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '40px', alignItems: 'center', justifyContent: 'center' }}>
      <h2>{count}</h2>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  )
}