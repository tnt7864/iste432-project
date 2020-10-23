const express = require("express");

const handleRoute = handler => async (req, res, next) => {
	try{
		let result = handler(req, res);
		if(result instanceof Promise){
			result = await result;
		}
		
		res.json(result);
	}catch(e){
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
module.exports.rest = ({ get, list, post, put, delete: deleteMethod }) => {
	const router = express.Router();
	
	router.get("/", handleRoute(() => list()));
	
	router.get("/:id", handleRoute(req => get(req.params.id)));
	
	router.post("/", express.json(), handleRoute(req => post(req.body)));
	
	router.put("/:id", express.json(), handleRoute(req => put(req.params.id, req.body)));
	
	router.delete("/:id", handleRoute(req => deleteMethod(req.params.id)));
	
	return router;
}
