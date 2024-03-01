import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from '../pages/App/index.jsx';

const BasicMap = () => {

  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </HashRouter>
  );
}

export default BasicMap
