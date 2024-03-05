import React from "react";
import globalConfig from "../../../config/globalConfig";
import Countdown from "../../../hooks/useCountdown";
import { main } from '../../../utils/global'
import "./LoginPanel.scss"
import axios from 'axios'

const LoginPanel = () => {

  const goIndex = () => {
    axios.post("http://localhost:3000/react16/login").then(res => {
      window.localStorage.setItem('login', 1)
      main.appInfo.loginState.logined()
      main.appInfo.routerLink.routerPush('/vue3/#/index')
    })
  }

  return (
    <div className="panel">
      <img className="panelLogo" src={``}/>
      <h2 className="panelSubtitle">快速登录</h2>

      <div className="panelForm">

        <div className="panelFormItem">
          <img className="panelFormIcon" src={`${globalConfig.baseUrl}/icon-phone.png`}/>
          <input className="panelFormInput" placeholder="请输入手机号"/>
        </div>

        <div className="panelFormItem">
          <img className="panelFormIcon" src={`${globalConfig.baseUrl}/icon-verification.png`}/>
          <input className="panelFormInput" placeholder="请输入右侧验证码"/>
          <img className="panelFormRight" src={`${globalConfig.baseUrl}/icon-number.png`}/>
        </div>

        <div className="panelFormItem">
          <img className="panelFormIcon" src={`${globalConfig.baseUrl}/icon-sms.png`}/>
          <input className="panelFormInput" placeholder="请输入动态码"/>
          <Countdown className="panelFormRight"/>
        </div>
      </div>

      <button className="panelButton" onClick={goIndex}>登录</button>
    </div>
  )
}

export default LoginPanel;
