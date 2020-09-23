const express = require("express");

/**
 * Starts up the server
 * @param {any} config Configuration object
 * @param {any} data The data layer
 */
module.exports.start = (config, data) => {
	const port = config.port || 8080;
	
	const app = express();
	
	app.listen(port, () =>
		console.log("Server listening on port", port)
	);
};
