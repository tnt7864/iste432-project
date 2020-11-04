const { setupDataLayer, initDb } = require("../../layers/data");
const fs = require("fs");
const path = require("path");
const os = require("os");

module.exports.createTestDb = async () => {
	const folder = await fs.promises.mkdtemp(
		path.join(os.tmpdir(), "iste432-test-db")
	);
	
	const conf = {
		dbtype: 'sqlite',
		dbopts: {
			filename: path.join(folder, "sqlite.db")
		}
	};
	
	await initDb(conf);
	const dl = setupDataLayer(conf);
	
	return dl;
}
