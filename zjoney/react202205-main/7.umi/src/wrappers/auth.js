import { Redirect } from 'umi';
export default (props) => {
  const isLogin = localStorage.getItem('isLogin');
  if (isLogin) {
    return <div>{props.children}</div>
  } else {
    return <Redirect to={{ pathname: '/login', state: { from: '/profile' } }} />
  }
}