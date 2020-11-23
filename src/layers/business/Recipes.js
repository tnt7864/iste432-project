const { rest } = require("./rest");

module.exports = (dl) => rest({
	async get(id){
		const result = await dl.Recipes.read(id);
		if(!result){
			throw 404;
		}
		
		return result;
	},
	
	async list(){
		return (await dl.Recipes.list())
	},
	
	async post(obj){
		await dl.Recipes.create(obj);
		
		const res = await dl.Recipes.readWhere(obj);
		if(!res.length){
			throw 500;
		}
		
		return res[0];
	},
	
	async put(id, data){
		const recipe = await dl.Recipes.read(id);
		if(!recipe){
			throw 404;
		}
		
		await dl.Recipes.update({
			...data,
			RecipeID: id
		});
		
		return await dl.Recipes.read(id);
	},
	
	async delete(id){
		const obj = await dl.Recipes.read(id);
		if(!obj){
			throw 404;
		}
		
		await dl.Recipes.delete(id);
		throw 204; //no content
	},
})
