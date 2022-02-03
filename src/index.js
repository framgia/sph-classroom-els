import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

import Routes from './routes';

import { ToastProvider } from './context/ToastContext';
import Toaster from './components/Toaster';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <ToastProvider>
          <Routes />
          <Toaster />
        </ToastProvider>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
);
