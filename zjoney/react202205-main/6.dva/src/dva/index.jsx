import React from 'react';
import { createRoot } from 'react-dom/client';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import prefixNameSpace from './prefixNameSpace';
import createSagaMiddleware from 'redux-saga';
import * as sagaEffects from 'redux-saga/effects';
import { createBrowserHistory } from 'history';
import { HistoryRouter } from 'redux-first-history/rr6';
import { createReduxHistoryContext } from 'redux-first-history';
export { connect }
let history = createBrowserHistory();
function dva(options) {
  const app = {
    _models: [],
    model,
    _router: null,
    router,
    start,
    createActionCreators
  }

  const { routerReducer, routerMiddleware, createReduxHistory } = createReduxHistoryContext({ history });
  const initialReducers = { router: routerReducer };
  function model(model) {
    const prefixedModel = prefixNameSpace(model);
    app._models.push(prefixedModel);
    return prefixedModel;
  }
  function router(router) {
    app._router = router;
  }
  function createActionCreators() {
    const combinedActionCreators = {};
    for (const model of app._models) {
      const { namespace, reducers, effects } = model;
      const actionCreators = {};
      for (const key in reducers) {
        actionCreators[key.split('/')[1]] = () => ({ type: key })
      }
      for (const key in effects) {
        actionCreators[key.split('/')[1]] = () => ({ type: key })
      }
      combinedActionCreators[namespace] = actionCreators;// actionCreators.counter1={}
    }
    return combinedActionCreators;
  }
  function start(selector) {
    for (const model of app._models) {
      initialReducers[model.namespace] = getReducer(model);
    }
    const rootReducer = createReducer();
    const sagas = getSagas(app);
    const sagaMiddleware = createSagaMiddleware();
    const store = applyMiddleware(sagaMiddleware, routerMiddleware, ...options.onAction)(createStore)(rootReducer);
    sagas.forEach(saga => sagaMiddleware.run(saga));
    const reduxHistory = createReduxHistory(store)
    createRoot(document.querySelector(selector)).render(
      <Provider store={store}>
        <HistoryRouter history={reduxHistory}>
          {app._router()}
        </HistoryRouter>
      </Provider>);
    /*     //React17
        ReactDOM.render(
          <Provider store={store}>
            <HistoryRouter history={reduxHistory}>
              {app._router()}
            </HistoryRouter>
          </Provider>, document.querySelector(selector)
        ); */
  }
  function getSagas(app) {
    const sagas = [];
    for (const model of app._models) {
      sagas.push(getSaga(model));
    }
    return sagas;
  }
  function createReducer() {
    return combineReducers(initialReducers);
  }
  return app;
}
function getSaga(model) {
  const { effects } = model;
  return function* () {
    for (const key in effects) {
      yield sagaEffects.takeEvery(key, function* (action) {
        yield effects[key](action, {
          ...sagaEffects,
          put: action => sagaEffects.put({ ...action, type: prefixType(action.type, model.namespace) })
        });//sagaEffects={put,take}
      });
    }
  }
}
function prefixType(type, namespace) {
  if (type.indexOf('/') == -1) {
    return `${namespace}/${type}`;
  } else {
    const typeNamespace = type.split('/')[0]
    if (typeNamespace === namespace) {
      console.warn(`[sagaEffects.put] ${type} should not be prefixed with namespace ${namespace}`);
    }
    return type;
  }
}
function getReducer(model) {
  const { reducers, state: initialState } = model;
  return (state = initialState, action) => {
    let reducer = reducers[action.type];
    if (reducer) {
      return reducer(state, action);
    }
    return state;
  }
}
export default dva;