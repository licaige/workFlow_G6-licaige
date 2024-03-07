import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initQiankun } from 'microApp'
import { microApps } from 'microApp/config'
import { useAppDispatch, useAppSelector } from 'store'
import { commonActions } from 'store/common'

// 初始化配置
const useInitConfig = () => {
  const location = useLocation()
  const { currentApp } = useAppSelector((state) => state.common)
  const dispatch = useAppDispatch()

  useEffect(() => {
    try {
      // 获取当前子应用名称
      const regular = /micro\/([a-zA-Z-]+)/g
      const subAppName = regular.exec(location.pathname)?.[1]
      if (subAppName) {
        // 设置当前子应用
        const micApp = microApps.find((item) => item.name === subAppName)
        if (micApp && micApp.name !== currentApp?.name) {
          dispatch(commonActions.setCurrentApp(micApp))
        }
      }
    } catch (error) {
      console.log('%c👉  error: ',
        'background:#41b883;padding:1px; border-radius: 0 3px 3px 0;color: #fff', error) // 👈
    }
  }, [currentApp, dispatch, location.pathname])

  useEffect(() => {
    // 可以在此处通过判断权限【是否登录可获取的用户信息、菜单、按钮等权限】来决定是否初始化微应用
    initQiankun()
  }, [])
}

export default useInitConfig