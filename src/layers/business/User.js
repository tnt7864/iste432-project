const { rest } = require("./rest");

module.exports = dl => rest({
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
	
	async post({ username, password, email, name }){
		await dl.Users.create({
			username,
			password,
			email,
			name
		});
		throw 201; //created
	},
	
	async put(id, data){
		await dl.Users.update({
			...data,
			UserID: id
		});
		
		return await dl.Users.read(id);
	},
	
	async delete(id){
		await dl.Users.delete(id);
		throw 204; //no content
	}
});
