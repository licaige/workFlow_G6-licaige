import { Link } from 'umi';
export default function (props) {
  return (
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/user">用户管理</Link></li>
        <li><Link to="/profile">个人设置</Link></li>
      </ul>
      {props.children}
    </div>
  )
}