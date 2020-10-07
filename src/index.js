//load the configuration file, falling back to an empty object without erroring
const config = (() => {
	try{
		return require("../config.json");
	}catch{
		return {};
	}
})();

const { setupDataLayer } = require("./layers/data");
const { start } = require("./layers/business");

start(config, setupDataLayer(config));
