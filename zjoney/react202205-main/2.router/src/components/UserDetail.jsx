import React from 'react'
import { useLocation, useParams } from '../react-router-dom';
import { UserAPI } from '../utils';
export default function UserDetail(props) {
  const location = useLocation();
  const { id } = useParams();
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    let user = location.state;//首先取路径对象的状态
    if (!user) {
      if (id) {
        user = UserAPI.find(id);
      }
    }
    if (user) setUser(user);
  }, []);
  return (
    <div>
      {user.id}:{user.name}
    </div>
  )
}
//在以前V5里在 路由渲染出的组件中是有location属性的。但是V6里没有了