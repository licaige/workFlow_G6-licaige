import React from 'react';
import { Router, useNavigate, useLocation } from '../react-router';
import { createHashHistory, createBrowserHistory } from '../history';
export * from '../react-router';
export function HashRouter({ children }) {
  let historyRef = React.useRef();//{current:null}
  if (historyRef.current == null) {
    historyRef.current = createHashHistory();
  }
  let history = historyRef.current;
  let [state, setState] = React.useState({
    action: history.action,//动作 pushState PUSH popstate POP
    location: history.location //路径当前历史中的路径，也就是栈顶的路径 {pathname:'/a'}
  });
  //监听路径变化，当路径发生变化后重新执行setState
  React.useLayoutEffect(() => history.listen(setState), [history]);
  return (
    <Router
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}

export function BrowserRouter({ children }) {
  let historyRef = React.useRef();//{current:null}
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }
  let history = historyRef.current;
  let [state, setState] = React.useState({
    action: history.action,//动作 pushState PUSH popstate POP
    location: history.location //路径当前历史中的路径，也就是栈顶的路径 {pathname:'/a'}
  });
  //监听路径变化，当路径发生变化后重新执行setState
  React.useLayoutEffect(() => history.listen(setState), [history]);
  return (
    <Router
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}

export function Link({ to, children, ...rest }) {
  const navigate = useNavigate();//是一个跳转路径的方法
  return (
    <a {...rest} href={to} onClick={(event) => {
      event.preventDefault();
      navigate(to);
    }} >{children}</a>
  )
}

export function NavLink({
  style: styleProp = {},
  className: classNameProp = '',
  end = false,//是否结束 end=true 后面不能跟内容了，end=false的话后面还可以跟内容 
  to,//跳转的目标路径
  children,//渲染的内容
  ...rest
}) {
  let location = useLocation();
  let path = { pathname: to };
  let locationPathname = location.pathname;//当前的路径名  /user/add
  let toPathName = path.pathname;//要跳转的路径名  /user
  let isActive = locationPathname === toPathName || (
    !end && locationPathname.startsWith(toPathName) && locationPathname.charAt(toPathName.length) == '/'
  )
  let className = classNameProp;
  if (typeof classNameProp === 'function') {
    className = classNameProp({ isActive });
  }
  let style = styleProp;
  if (typeof styleProp === 'function') {
    style = styleProp({ isActive });
  }
  return (
    <Link {...rest} to={to} className={className} style={style} children={children} />
  )
}