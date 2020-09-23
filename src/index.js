const config = (() => {
	try{
		return require("../config.json");
	}catch{
		return {};
	}
})()

const { start } = require("./layers/business");

start(config);
