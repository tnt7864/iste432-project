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
		this.allProps = [...this.primaryKey, ...this.properties];
	}
	
	/**
	 * Comma-separated list of properties including the primary key
	 * Can be used in a SELECT or INSERT statement
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
	 * @param {string[]?} props The properties to use
	 * @returns {string}
	 */
	setProperties(props = this.properties){
		return this.properties.map(n => n + " = ?").join(", ");
	}
	
	/**
	 * Inserts an object into the table
	 * @param {any} obj Data to insert into the table
	 * @returns {Promise<number>} Number of affected rows
	 */
	async create(obj){
		const sql = "INSERT INTO " + this.table + "(" + this.selectProps() + ") VALUES (" + this.allProps.map(n => "?").join(", ") + ")";
		
		const params = this.allProps.map(n => obj[n]);
		
		return await this.db.run(sql, params);
	}
	
	/**
	 * Gets an item by its primary key(s)
	 * @param {any|any[]} id Primary key(s) of the desired item
	 * @returns {Promise<any>}
	 */
	async read(id){
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
	 * @returns {Promise<number>} The number of modified rows in the table
	 */
	async update(obj){
		//get the primary key properties
		const ids = this.primaryKey.map(n => obj[n]);
		
		//get the other properties that will be updated
		const props = this.properties.filter(n => n in obj);
		const others = others.map(n => obj[n]);
		
		const sql = "UPDATE " + this.table + " SET " + this.setProperties(props) + " WHERE " + this.wherePrimaryKey();
		
		return await this.db.run(sql, [...others, ...ids]);
	}
	
	/**
	 * Deletes an entry from the table
	 * @param {any[]|any} id The primary key array or object to delete from the table
	 * @returns {Promise<number>} Number of modified rows
	 */
	async delete(id){
		//if the id is the object to delete, turn it into the primary key array
		if(typeof id === 'object'){
			id = this.primaryKey.map(n => id[n]);
		}
		
		const sql = "DELETE FROM " + this.table + " WHERE " + this.wherePrimaryKey();
		
		return await this.db.run(sql, id);
	}
}
