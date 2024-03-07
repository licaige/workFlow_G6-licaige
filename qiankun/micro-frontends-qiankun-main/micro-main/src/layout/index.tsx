// import { Counter } from 'components/counter';
// import { Pokemon } from 'components/pokemon';
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from 'store';
import { TMenuList } from 'types'
import menusList from 'mock/menusList'

const reactSubApps = ['reactApp', 'reactAppOne', 'reactAppTwo']
const vueSubApps = ['vueApp', 'vueAppOne', 'vueAppTwo']

const Layout = () => {
  const { currentApp, microAppIsLoading } = useAppSelector((state) => state.common)

  let currentMenus: TMenuList = []

  if (currentApp?.name && reactSubApps?.includes(currentApp?.name)) {
    currentMenus = menusList.find((item) => item.path === '/micro/reactApp')?.children || []
  }

  if (currentApp?.name && vueSubApps?.includes(currentApp?.name)) {
    currentMenus = menusList.find((item) => item.path === '/micro/vueApp')?.children || []
  }

  return (
    <div className="layout">
      {/* <Counter />
      <Pokemon /> */}
      <div className='layout-header'>
        {
          menusList.map((item, index) => (
            <Link
              key={item?.id || index}
              to={item.path}
              style={{ marginRight: '15px' }}
            >
              {item.name}
            </Link>
          ))
        }
      </div>
      <div className='layout-container'>
        <div className='layout-left'>
          {currentMenus?.map((item) => (
            <Link to={item.path} key={item.path}>{item.name}</Link>
          ))}
        </div>
        <div className='layout-right'>
          <button>主应用(micro-main)按钮</button>
          {microAppIsLoading && <div className='layout-loading'>loading...</div>}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
