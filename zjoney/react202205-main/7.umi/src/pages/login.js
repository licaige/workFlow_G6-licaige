import React from 'react';
import { history } from 'umi';
export default (props) => {
  return (
    <div>
      <h1 >Page login</h1>
      <button onClick={() => {
        localStorage.setItem('isLogin', 'true');
        if (props.location.state && props.location.state.from) {
          history.push(props.location.state.from);
        }
      }}>登录</button>
    </div>
  );
}