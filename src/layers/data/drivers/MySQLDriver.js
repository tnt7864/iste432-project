const mysql = require('mysql2/promise');

/**
 * @typedef {import('./BaseDriver').BaseDriver} BaseDriver
 */

/**
 * @implements {BaseDriver}
 */
module.exports.MySQLDriver = class MySQLDriver{
	constructor({ host, database, user, password }){
		this.pool = mysql.createPool({
			connectionLimit: 10,
			host,
			database,
			user,
			password
		});
	}
	
	/**
	 * mysql2 doesn't like undefined, so undefined parameters should be turned into null
	 * @param {any[]} params Parameters to manipulate
	 * @returns {any[]} The altered parameters
	 */
	params(params){
		if(!params || !Array.isArray(params)){
			return [];
		}
		
		return params.map(p => p === undefined ? null : p);
	}
	
	async query(statement, params){
		const [rows, fields] = await this.pool.execute(statement, this.params(params));
		return rows;
	}
	
	async run(statement, params){
		const [res, fields] = await this.pool.execute(statement, this.params(params));
		return res.affectedRows;
	}
	
	async close(){
		await this.pool.end();
	}
};
