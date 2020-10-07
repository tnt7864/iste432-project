const express = require("express");
const { applyServeStatic } = require("./serve-static");

/**
 * Starts up the server
 * @param {any} config Configuration object
 * @param {any} data The data layer
 */
module.exports.start = (config, data) => {
	const port = config.port || 8080;
	
	const app = express();
	
	applyServeStatic(app, config);
	
	app.listen(port, () =>
		console.log("Server listening on port", port)
	);
};
