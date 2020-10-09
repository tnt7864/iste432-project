import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider, connect } from 'react-redux';
import { store } from './redux';
import ErrorDialog from './components/ErrorDialog';
import { setError } from './redux/actions/error';

const mapStateToProps = (state, props) => ({
  ...props,
  error: state.error
})

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={() => store.dispatch(setError("this is an error"))}>Trigger error example</button>
        </header>
      </div>
      <ErrorDialog />
    </Provider>
  );
}

export default App;
