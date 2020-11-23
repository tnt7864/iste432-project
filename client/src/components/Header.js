import { AppBar, IconButton, Toolbar, Typography, Zoom } from '@material-ui/core';
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
	
	let title = "Recipes";
	
	if(login || location === "/login"){
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
	</AppBar>
}

export const Header = connect(
	(state, props) => {
		return props
	}
)(HeaderComponent)
