import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { throttle } from 'lodash';
import { ToastContainer } from 'react-toastify';
import './scss/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import Utils from './common/utils';
import { fetchTodos } from './features/todos/todosSlice';
import App from './app/App';
import store from './app/store';

store.subscribe(throttle(() => {
  Utils.store('todos', store.getState().todos);
}, 1000));

store.dispatch(fetchTodos());

ReactDom.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
  document.querySelector('.app'),
);
