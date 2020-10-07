const { createDatabaseConnection } = require("./drivers");
const { createTables } = require("./domain");

module.exports.setupDataLayer = config => {
	const db = createDatabaseConnection(
		config.dbtype || 'sqlite',
		config.dbopts || { filename: 'sqlite.db' }
	);
	
	const tables = createTables(db);
	
	return tables;
};
