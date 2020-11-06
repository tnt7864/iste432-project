import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux';
import ErrorDialog from './components/ErrorDialog';
import { HashRouter } from 'react-router-dom';
import Router from './routes';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Router />
      </HashRouter>
      <ErrorDialog />
    </Provider>
  );
}

export default App;
