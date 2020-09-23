const { MySQLDriver } = require("./MySQLDriver");
const { SQLiteDriver } = require("./SQLiteDriver");

/**
 * @typedef {import('./BaseDriver').BaseDriver} BaseDriver
 */

/** @type {{[key: string]: BaseDriver}} */
const databases = {
	mysql: MySQLDriver,
	sqlite: SQLiteDriver,
};

/**
 * Creates a connection to a database
 * @param {string} type The type of database to create
 * @param {{[key: string]: any}} opts Options to create the database with
 * @returns {BaseDriver}
 */
module.exports.createDatabaseConnection = (type, opts) => {
	if(!(type in databases)){
		throw new Error(`Unknown database type ${type}`);
	}
	
	return new databases[type](opts);
};
