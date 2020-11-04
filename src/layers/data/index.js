const { createDatabaseConnection } = require("./drivers");
const { createTables } = require("./domain");
const fs = require("fs");
const path = require("path");

const getDb = config => {
	const db = createDatabaseConnection(
		config.dbtype || 'sqlite',
		config.dbopts || { filename: 'sqlite.db' }
	);
	return db;
}

module.exports.setupDataLayer = config => {
	const db = getDb(config);
	
	const tables = createTables(db);
	
	return tables;
};

module.exports.initDb = async config => {
	const db = getDb(config);
	
	const type = config.dbtype || 'sqlite';
	const initFile = path.join(path.dirname(__filename), "ddl", type + ".sql");
	
	const content = (await fs.promises.readFile(initFile)).toString();
	
	const instructions = content.split(';').map(n => n.trim()).filter(n => n.length);
	while(instructions.length){
		await db.run(instructions.shift());
	}
};
