/**
 * @typedef {import('../drivers/BaseDriver').BaseDriver} BaseDriver
 */

module.exports.TableClass = class TableClass{
	/**
	 * Creates a class representing a table
	 * The strings passed in the constructor here are inserted directly into SQL, they must be sanitized and cannot contain user data
	 * @param {BaseDriver} db Database to use
	 * @param {string} table Table to pull data from
	 * @param {string|string[]} primaryKey Primary key column(s)
	 * @param {string[]} properties Other columns
	 */
	constructor(db, table, primaryKey, properties){
		this.db = db;
		this.table = table;
		this.primaryKey = Array.isArray(primaryKey) ? primaryKey : [primaryKey]; //make it an array if it's not already
		this.properties = properties;
	}
	
	/**
	 * Comma-separated list of properties including the primary key
	 * Can be used in a SELECT statement
	 * @returns {string}
	 */
	selectProps(){
		return [...this.primaryKey, ...this.properties].join(",");
	}
	
	/**
	 * Constructs a WHERE clause matching all primary key(s) of this table
	 * e.g. for primary key ["id1", "id2"] it returns "id1 = ? AND id2 = ?"
	 * @returns {string}
	 */
	wherePrimaryKey(){
		return this.primaryKey.map(n => n + " = ?").join(" AND ");
	}
	
	/**
	 * Constructs a SET clause setting all properties of this table
	 * e.g. for properties ["prop1", "prop2"] it returns "prop1 = ?, prop2 = ?"
	 * @returns {string}
	 */
	setProperties(){
		return this.properties.map(n => n + " = ?").join(", ");
	}
	
	/**
	 * Gets an item by its primary key(s)
	 * @param {any|any[]} id Primary key(s) of the desired item
	 * @returns {any}
	 */
	async get(id){
		const sql = "SELECT " + this.selectProps() + " FROM " + this.table + " WHERE " + this.wherePrimaryKey();
		
		if(!Array.isArray(id)){
			id = [id];
		}
		
		const result = await this.db.query(sql, id);
		return result[0];
	}
	
	/**
	 * Updates an object from a table with new values based on the primary key(s)
	 * @param {any} obj The object to update
	 * @returns {number} The number of modified rows in the table
	 */
	update(obj){
		//get the primary key properties
		const ids = this.primaryKey.map(n => obj[n]);
		
		//get the other properties that will be updated
		const others = this.properties.filter(n => n in obj).map(n => obj[n]);
		
		const sql = "UPDATE " + this.table + " SET " + this.setProperties() + " WHERE " + this.wherePrimaryKey();
		
		const result = await this.db.run(sql, [...others, ...ids]);
		return result;
	}
}
