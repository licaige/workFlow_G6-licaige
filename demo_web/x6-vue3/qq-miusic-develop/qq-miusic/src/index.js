import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'lib-flexible';
import './assets/font_74bntjvs7d9/iconfont.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from "react-redux";
import reducer from "./store";
import {createStore,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
const store = createStore(reducer,applyMiddleware(thunk,logger))
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
