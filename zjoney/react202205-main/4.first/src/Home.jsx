import { useDispatch } from 'react-redux';
import { push } from './redux-first-history'
function Home() {
  const dispatch = useDispatch();

  return (
    <div>
      <p>Home</p>
      <button onClick={() => dispatch(push('/counter'))}>跳到/counter</button>
    </div>
  )
}
export default Home;