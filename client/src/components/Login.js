import { Button, Paper, TextField } from '@material-ui/core';
import React, { useCallback, useState } from 'react';

export const Login = ({ onLogin = () => {} }) => {
	const [loggingIn, setLoggingIn] = useState(false);
	
	const [un, setUsername] = useState("");
	const [pw, setPassword] = useState("");
	const [em, setEmail] = useState("");
	const [nm, setName] = useState("");
	
	const setUn = useCallback(e => setUsername(e.target.value), [setUsername])
	const setPw = useCallback(e => setPassword(e.target.value), [setPassword])
	const setEm = useCallback(e => setEmail(e.target.value), [setEmail])
	const setNm = useCallback(e => setName(e.target.value), [setName])
	
	const logIn = useCallback(async register => {
		setLoggingIn(true);
		
		const res = await fetch(register === true ? "/api/user" : "/api/user/login", {
			method: "POST",
			body: JSON.stringify({
				username: un,
				password: pw,
				name: nm,
				email: em
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		
		if(!res.ok){
			return setLoggingIn("There was an error logging in");
		}
		
		setLoggingIn(false);
		onLogin();
	}, [un, pw, nm, em, onLogin])
	
	const register = useCallback(() => logIn(true), [logIn])
	
	return <Paper style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
		<TextField value={un} onChange={setUn} label="Username" />
		<TextField value={em} onChange={setEm} label="Email (if registering)" />
		<TextField value={nm} onChange={setNm} label="Name (if registering)" />
		<TextField type="password" value={pw} onChange={setPw} label="Password" />
		<Button onClick={logIn} disabled={loggingIn === true}>Log in</Button>
		<Button onClick={register} disabled={loggingIn === true}>Register</Button>
		{typeof loggingIn === "string" && loggingIn}
	</Paper>
}
