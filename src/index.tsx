import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './style/style.scss';
import rootReducer from './store/reducers';
import App from './components/app';

// this creates the store with the reducers
const store = configureStore({
  reducer: rootReducer,
});

const main: HTMLElement | null = document.getElementById('main');
if (!main) throw new Error('Could not find main element.');
const root = createRoot(main);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
