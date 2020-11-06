const express = require("express");

const handleRoute = handler => async (req, res, next) => {
	try{
		let result = handler(req, res);
		if(result instanceof Promise){
			result = await result;
		}
		
		res.json(result);
	}catch(e){
		if(typeof e === 'number'){
			res.status(e);
			return res.send();
		}
		next(e);
	}
}

/**
 * Creates a REST route with GET, POST, PUT, and DELETE endpoints
 * @param {any} methods The methods for this REST section
 * @property {(id: number) => any} get Called on a GET request to /:id, gets a single object
 * @property {() => any[]} list Called on a GET request to /, gets all objects
 * @property {(data: any) => any} post Called on a POST request to /, inserts an item
 * @property {(id: number, data: any) => any} put Called on a PUT request to /:id, updates an item
 * @property {(id: number) => any} delete Called on a DELETE request to /:id, deletes an item
 * @returns {express.Router} The resulting router
 */
module.exports.rest = ({ get, list, post, put, delete: deleteMethod, ...rest }) => {
	const router = express.Router();
	
	router.get("/", handleRoute((req, res) => list(req, res)));
	
	router.get("/:id", handleRoute((req, res) => get(req.params.id, req, res)));
	
	router.post("/", express.json(), handleRoute((req, res) => post(req.body, req, res)));
	
	router.put("/:id", express.json(), handleRoute((req, res) => put(req.params.id, req.body, req, res)));
	
	router.delete("/:id", handleRoute((req, res) => deleteMethod(req.params.id, req, res)));
	
	for(let i in rest){
		router.get(i, handleRoute(rest[i]));
	}
	
	return router;
}
