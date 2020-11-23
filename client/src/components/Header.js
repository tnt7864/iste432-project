import { Tabs, AppBar, IconButton, Toolbar, Typography, Zoom, Tab } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import BackIcon from '@material-ui/icons/ArrowBack';

const HeaderComponent = ({ login }) => {
	const history = useHistory();
	const [location, setLocation] = useState(history.location.pathname);
	
	const back = useCallback(() => history.goBack(), [history]);
	
	useEffect(() => {
		return history.listen((location, action) => {
			setLocation(location.pathname);
		})
	}, [history]);
	
	let title = "page title";
	if(login){
		title = "Log in";
	}
	
	return <AppBar position="relative">
		<Toolbar>
			<Zoom in>
				<IconButton color="inherit" edge="start" aria-label="Back" onClick={back}>
					<BackIcon />
				</IconButton>
			</Zoom>
			
			<Typography variant="h6">
				{title}
			</Typography>
		</Toolbar>
		{/* <Tabs value={0} onChange={() => {}}>
		</Tabs> */}
	</AppBar>
}

export const Header = connect(
	(state, props) => {
		return props
	}
)(HeaderComponent)
