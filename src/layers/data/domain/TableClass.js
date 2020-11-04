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
	 * Constructs a WHERE clause and associated parameter values for an object
	 * e.g. for input { a: 1, b: 2 } the result is ["a = ? AND b = ?", [1, 2]]
	 * @param {any} obj Keys and values to use
	 * @returns {[string, any[]]}
	 */
	whereFor(obj){
		let query = [];
		let values = [];
		for(let i in obj){
			query.push(i + " = ?");
			values.push(obj[i]);
		}
		return [
			query.join(" AND "),
			values
		];
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
		return props.map(n => n + " = ?").join(", ");
	}
	
	/**
	 * Inserts an object into the table
	 * @param {any} obj Data to insert into the table
	 * @returns {Promise<number>} Number of affected rows
	 */
	async create(obj){
		try{
			const sql = "INSERT INTO " + this.table + "(" + this.selectProps() + ") VALUES (" + this.allProps.map(n => "?").join(", ") + ")";
			
			const params = this.allProps.map(n => obj[n]);
			
			return await this.db.run(sql, params);
		}catch(err){
			throw new Error("Failed to create row in table " + this.table);
		}
	}
	
	/**
	 * Gets an item by its primary key(s)
	 * @param {any|any[]} id Primary key(s) of the desired item
	 * @returns {Promise<any>}
	 */
	async read(id){
		try{
			const sql = "SELECT " + this.selectProps() + " FROM " + this.table + " WHERE " + this.wherePrimaryKey();
			
			if(!Array.isArray(id)){
				id = [id];
			}
			
			const result = await this.db.query(sql, id);
			if(!result.length){
				return;
			}
			
			return result[0];
		}catch(err){
			throw new Error("Failed to retrieve row from table " + this.table);
		}
	}
	
	/**
	 * Gets an array of items by arbitrary field(s)
	 * @param {any?} obj Field names and values to look for
	 * @returns {Promise<any[]>}
	 */
	async readWhere(obj){
		try{
			const [where, params] = this.whereFor(obj || {});
			const sql = "SELECT " + this.selectProps() + " FROM " + this.table + (where.length ? " WHERE " + where : "");
			
			const result = await this.db.query(sql, params);
			return result;
		}catch(err){
			throw new Error("Failed to retrieve rows from table " + this.table);
		}
	}
	
	/**
	 * Updates an object from a table with new values based on the primary key(s)
	 * @param {any} obj The object to update
	 * @returns {Promise<number>} The number of modified rows in the table
	 */
	async update(obj){
		try{
			//get the primary key properties
			const ids = this.primaryKey.map(n => obj[n]);
			
			//get the other properties that will be updated
			const props = this.properties.filter(n => n in obj);
			const vals = props.map(n => obj[n]);
			
			const sql = "UPDATE " + this.table + " SET " + this.setProperties(props) + " WHERE " + this.wherePrimaryKey();
			
			return await this.db.run(sql, [...vals, ...ids]);
		}catch(err){
			throw new Error("Failed to update row in table " + this.table);
		}
	}
	
	/**
	 * Deletes an entry from the table
	 * @param {any[]|any} id The primary key array or object to delete from the table
	 * @returns {Promise<number>} Number of modified rows
	 */
	async delete(id){
		try{
			//if the id is the object to delete, turn it into the primary key array
			if(typeof id === 'object'){
				id = this.primaryKey.map(n => id[n]);
			}
			
			const sql = "DELETE FROM " + this.table + " WHERE " + this.wherePrimaryKey();
			
			return await this.db.run(sql, id);
		}catch(err){
			throw new Error("Failed to delete row from table " + this.table);
		}
	}
}
