import React, {useEffect} from 'react';
import globalConfig from "../../config/globalConfig";
import LoginPanel from "./components/LoginPanel.jsx";
import { main } from '../../utils/global'

import "./index.scss"

const Login = () => {

  useEffect(() => {
    // 登录页面隐藏头部底部
    main.appInfo.footerState.changeFooter(false)

    main.appInfo.headerState.changeHeader(false)
    main.appInfo.crumbsState.setCrumbs([])
  }, [])

  return (
    <div className="login">
      <img className="loginBackground" src={`${globalConfig.baseUrl}/login-background.png`}/>
      <LoginPanel/>
    </div>
  )
}

export default Login
