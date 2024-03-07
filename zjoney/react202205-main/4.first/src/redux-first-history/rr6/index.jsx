//BrowserRouter HashRouter HistoryRouter
import React from 'react';
import { Router } from 'react-router';
export function HistoryRouter({ history, children }) {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });
  React.useLayoutEffect(() => {
    //监听路径变化，当路径发生变化后，会把最新的路径和动作传进来调用回调函数
    history.listen(({ action, location }) => setState({ action, location }));
  }, [history]);
  return (
    <Router
      location={state.location}
      action={state.action}
      navigator={history}
      navigationType={state.action}
    >
      {children}
    </Router>
  )
}