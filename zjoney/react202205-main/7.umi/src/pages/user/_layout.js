import { Link } from 'umi';
export default function (props) {
  console.log(props);
  return (
    <div>
      <ul>
        <li><Link to="/user/list">用户列表</Link></li>
        <li><Link to="/user/add">添加用户</Link></li>
      </ul>
      {props.children}
    </div>
  )
}