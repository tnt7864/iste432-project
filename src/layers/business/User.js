const { rest } = require("./rest");
const { hash, verify } = require("argon2");
const { newToken } = require("./token");

module.exports = (dl, tokens) => ({
	route: rest({
		async get(id){
			const result = await dl.Users.read(id);
			if(!result){
				throw 404;
			}
			
			delete result.password;
			return result;
		},
		
		async list(){
			return (await dl.Users.list()).map(n => {
				delete n.password;
				return n;
			});
		},
		
		async post({ username, password, email, name }, req, res){
			if(!password){
				throw 400;
			}
			const hashed = await hash(password);
			
			const withUsername = await dl.Users.readWhere({ username });
			if(withUsername.length){
				throw 403; //forbidden, username already taken
			}
			
			await dl.Users.create({
				username,
				password: hashed,
				email,
				name
			});
			
			const r = await dl.Users.readWhere({ username });
			if(!r.length){
				throw 500;
			}
			
			const token = newToken(tokens);
			tokens[token] = {
				username: data.username,
				UserID: user.UserID
			}
			
			res.cookie('token', token, { httpOnly: false });
			return r[0];
		},
		
		async put(id, data){
			const user = await dl.Users.read(id);
			if(!user){
				throw 404;
			}
			
			if(!('verify' in data)){
				throw 401;
			}
			if(!(await verify(user.password, data.verify))){
				throw 403;
			}
			
			delete data.username; // username cannot be changed
			
			if('password' in data){
				data.password = await hash(data.password);
			}
			await dl.Users.update({
				...data,
				UserID: id
			});
			
			return await dl.Users.read(id);
		},
		
		async delete(id, req, res){
			const user = await dl.Users.read(id);
			if(!user){
				throw 404;
			}
			
			const data = req.body || {};
			if(!('verify' in data)){
				throw 401; //unauthorized
			}
			if(!(await verify(data.verify, user.password))){
				throw 403; //forbidden
			}
			
			await dl.Users.delete(id);
			throw 204; //no content
		},
		
		rest: {
			"/login": {
				method: "post",
				async action(req, res){
					const data = req.body || {};
					if(!('username' in data) || !('password' in data)){
						throw 400;
					}
					
					const [user] = await dl.Users.readWhere({
						username: data.username
					});
					if(!user){
						throw 404;
					}
					
					if(!(await verify(user.password, data.password))){
						throw 401;
					}
					
					const token = newToken(tokens);
					tokens[token] = {
						username: data.username,
						UserID: user.UserID
					}
					
					res.cookie('token', token, { httpOnly: false });
					return { token }
				},
			},
			"/logout": {
				method: "get",
				async action(req, res){
					if(req.cookie.token && req.cookie.token in tokens){
						delete tokens[req.cookie.token];
					}
					res.cookie('token', '', { httpOnly: false, maxAge: 0 })
					
					throw 204;
				}
			}
		}
	}),
	auth: (req, res, next) => {
		if(!req.cookie.token || !(req.cookie.token in tokens)){
			return res.status(401).send('Not authorized');
		}
		
		req.userdata = tokens[req.cookie.token];
		next();
	}
})
