const sqlite = require("sqlite3");

/**
 * @typedef {import('./BaseDriver').BaseDriver} BaseDriver
 */

/**
 * @implements {BaseDriver}
 */
module.exports.SQLiteDriver = class SQLiteDriver{
	constructor({ filename }){
		this.db = new sqlite.Database(filename);
	}
	
	query(statement, params = []){
		return new Promise((res, rej) => {
			this.db.all(statement, params, (err, obj) => {
				err ? rej(err) : res(obj);
			});
		});
	}
	
	run(statement, params = []){
		return new Promise((res, rej) => {
			this.db.run(statement, params, function(err){ //can't be an arrow function, `this` contains important information
				err ? rej(err) : res(this.changes);
			});
		});
	}
	
	/**
	 * Can run multiple semicolon-separated statements
	 * @param {string} statement SQL statements to run
	 * @returns {Promise<void>}
	 */
	exec(statement){
		return new Promise((res, rej) => {
			this.db.exec(statement, err => {
				err ? rej(err) : res();
			});
		});
	}
	
	close(){
		return new Promise((res, rej) => {
			this.db.close(err => {
				err ? rej(err) : res();
			});
		});
	}
}
