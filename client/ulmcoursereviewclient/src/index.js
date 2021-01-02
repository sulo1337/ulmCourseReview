import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './js/store/index'
import { Provider } from 'react-redux';

// if (navigator.serviceWorker) {
//   navigator.serviceWorker.register('./src/sw.js').then(function (registration) {
//     console.log('ServiceWorker registration successful with scope:', registration.scope);
//   }).catch(function (error) {
//     console.log('ServiceWorker registration failed:', error);
//   });
// }

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
