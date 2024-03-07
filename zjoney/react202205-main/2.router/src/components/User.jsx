import React from 'react'
import { NavLink, Outlet } from '../react-router-dom';
import { activeNavProps } from '../style';
export default function User() {
  return (
    <div>
      <ul>
        <li><NavLink to="/user/list" {...activeNavProps}>用户列表</NavLink></li>
        <li><NavLink to="/user/add" {...activeNavProps}>添加用户</NavLink></li>
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
