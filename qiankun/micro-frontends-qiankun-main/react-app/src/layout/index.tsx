import { useLocation, Outlet, Link } from 'react-router-dom'
import { qiankunWindow } from 'plugins/qiankun/helper';
import { menusList } from 'config'
import RootPage from 'pages/rootPage'
import styles from 'assets/scss/index.module.scss'

const Layout = () => {
  const location = useLocation()
  const isRootPage = location.pathname === '/'

  return (
    <div className={styles.layout}>
      {!qiankunWindow.__POWERED_BY_QIANKUN__ && (
        <div className={styles['layout-header']}>
          <Link to='/'>React 应用</Link>
        </div>
      )}
      <div className={styles['layout-container']}>
        {/* qiankunWindow.__POWERED_BY_QIANKUN__ 为 true 时，不显示菜单 */}
        {!qiankunWindow.__POWERED_BY_QIANKUN__ && (
          <div className={styles['layout-left']}>
            {menusList.map((item, index) => (
              <Link key={item?.id || index} to={item.path}>{item.name}</Link>
            ))}
          </div>
        )}
        <div className={styles['layout-right']}>
          {isRootPage && <RootPage />}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
