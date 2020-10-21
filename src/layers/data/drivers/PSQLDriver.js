const { Pool } = require("pg");

/**
 * @typedef {import('./BaseDriver').BaseDriver} BaseDriver
 */

/**
 * @implements {BaseDriver}
 */
module.exports.PSQLDriver = class PSQLDriver{
	constructor({ host, database, user, password, port }){
		this.pool = new Pool({
			host,
			database,
			user,
			password,
			port
		});
	}
	
	format(statement){
		let index = 0;
		return statement.replace(/\?/g, () => "$" + (++index));
	}
	
	async query(statement, params){
		const res = await this.pool.query(this.format(statement), params);
		return res.rows;
	}
	
	async run(statement, params){
		const res = await this.pool.query(this.format(statement), params);
		return res.rowCount;
	}
	
	async close(){
		await this.pool.end();
	}
};
