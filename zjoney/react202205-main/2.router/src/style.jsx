//激活的样式
const activeStyle = { backgroundColor: 'green' };
//激活类名
const activeClassName = 'active';
export const activeNavProps = {
  style: ({ isActive }) => isActive ? activeStyle : {},
  className: ({ isActive }) => isActive ? activeClassName : '',
}
