import React, { useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux';
import ErrorDialog from './components/ErrorDialog';
import { HashRouter } from 'react-router-dom';
import { Theme } from './components/Theme';
import { Header } from './components/Header';
import { Container } from '@material-ui/core';
import { Login } from './components/Login';
import { Recipes } from './components/Recipes';

const App = () => {
	const [loggedIn, setLoggedIn] = useState(!!document.cookie.match(/(^|;)token=/));
	
	return (
		<Provider store={store}>
			<Theme>
				<HashRouter>
					<Header login={!loggedIn} />
					<Container maxWidth="lg">
						{loggedIn ? <Recipes /> : <Login onLogin={() => setLoggedIn(true)} />}
					</Container>
				</HashRouter>
				<ErrorDialog />
			</Theme>
		</Provider>
	);
}

export default App;
