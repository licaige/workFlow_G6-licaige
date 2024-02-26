import React, {useEffect} from 'react';
import globalConfig from "../../config/globalConfig";
import LoginPanel from "./components/LoginPanel.jsx";
import { getMain } from '../../utils/main'

import "./index.scss"

const Login = () => {

  useEffect(() => {
    const main = getMain()
    main.appInfo.header.changeHeader(false)
    main.appInfo.nav.changeNav(false)
  }, [])

  return (
    <div className="login">
      <img className="loginBackground" src={`${globalConfig.baseUrl}/login-background.png`}/>
      <LoginPanel/>
    </div>
  )
}

export default Login
