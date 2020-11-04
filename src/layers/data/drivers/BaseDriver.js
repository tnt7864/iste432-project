/**
 * Interface for database drivers
 * @interface
 */
module.exports.BaseDriver = class BaseDriver{
	/**
	 * Creates the driver
	 * @param {{[key: string]: any}} opts Options for the database
	 */
	constructor(opts){}
	
	/**
	 * Makes a query to the database
	 * @param {string} statement SQL statement to run
	 * @param {any[]} params Array of parameters
	 * @returns {Promise<{[key: string]: any}[]>}
	 */
	async query(statement, params){}
	
	/**
	 * Makes a non-SELECT statement
	 * @param {string} statement SQL statement to run
	 * @param {any[]} params Array of parameters
	 * @returns {Promise<[number, number]>} Modified rows, inserted ID
	 */
	async run(statement, params){}
	
	/**
	 * Closes the database
	 * @returns {Promise<void>}
	 */
	async close(){}
}
