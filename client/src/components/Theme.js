import React, { useMemo } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { brown, orange } from '@material-ui/core/colors';

export const Theme = ({ children }) => {
	const theme = useMemo(() => createMuiTheme({
		palette: {
			type: 'light',
			primary: orange,
			secondary: brown
		}
	}), [])
	
	return <ThemeProvider theme={theme}>
		<CssBaseline />
		{children}
	</ThemeProvider>
}
