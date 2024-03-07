import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './react-redux1';
import Counter1 from './components/Counter1'
// import Counter2 from './components/Counter2'
import store from './store';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Counter1 />
    <hr />
    {/* <Counter2 /> */}
  </Provider>);