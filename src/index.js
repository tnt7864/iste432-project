//load the configuration file, falling back to an empty object without erroring
const config = (() => {
	try{
		return require("../config.json");
	}catch{
		return {};
	}
})();

const { start } = require("./layers/business");

start(config);
