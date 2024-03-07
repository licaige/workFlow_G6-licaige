import React from 'react'
import { Link } from '../react-router-dom';
import { UserAPI } from '../utils';
export default function User() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    let users = UserAPI.list();
    setUsers(users);
  }, []);
  return (
    <ul>
      {
        users.map((user, index) => (
          <li key={index}>
            <Link to={`/user/detail/${user.id}`} state={user}>{user.name}</Link>
          </li>
        ))
      }
    </ul>
  )
}
