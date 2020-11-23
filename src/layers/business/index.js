const cookieParser = require("cookie-parser");
const express = require("express");
const { applyServeStatic } = require("./serve-static");
const User = require("./User");
const Recipes = require("./Recipes");

/**
 * Starts up the server
 * @param {any} config Configuration object
 * @param {any} data The data layer
 */
module.exports.start = (config, data) => {
	const port = config.port || 8080;
	
	const app = express();
	app.use(cookieParser());
	app.use(express.json());
	
	applyServeStatic(app, config);
	
	const tokens = {};
	const { route, auth } = User(data, tokens);
	app.use('/api/user', route);
	app.use('/api/recipe', auth, Recipes(data));
	
	app.listen(port, () =>
		console.log("Server listening on port", port)
	);
};
