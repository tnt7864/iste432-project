const express = require("express");

const app = express();

module.exports.start = config => {
	const port = config.port || 8080;
	app.listen(port, () =>
		console.log("Server listening on port", port)
	);
};
