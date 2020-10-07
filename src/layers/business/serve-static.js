const serveStatic = require("serve-static");
const path = require("path");

const defaultPath = path.join(__dirname, "../../../client/build");

module.exports.applyServeStatic = (app, config) => {
	app.use(serveStatic(config.static || defaultPath))
}
