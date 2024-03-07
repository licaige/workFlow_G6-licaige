import React from 'react';
import { useLocation, useNavigate } from '../react-router-dom';
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = () => {
    localStorage.setItem('login', true);
    let to = '/';
    if (location.state) {
      to = location.state.from || '/';
    }
    navigate(to);
  }
  return (
    <button onClick={login}>登录</button>
  )
}
export default Login;