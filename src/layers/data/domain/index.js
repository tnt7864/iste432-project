const { TableClass } = require("./TableClass");

/**
 * @typedef {import('../drivers/BaseDriver').BaseDriver} BaseDriver
 */

/**
 * 
 * @param {BaseDriver} db The database connection to use
 */
module.exports.createTables = db => ({
	Recipes: new TableClass(db, "Recipes", "RecipeID", [
		"IngredientID",
		"ProductID",
		"MenuItemID",
		"MealPlanningID",
		"UserID",
		"name",
		"desc"
	]),
	Users: new TableClass(db, "Users", "UserID", [
		"name",
		"email",
		"username",
		"password"
	]),
	Ingredients: new TableClass(db, "Ingredients", "IngredientID", [
		"name",
		"desc"
	]),
	Products: new TableClass(db, "MenuItems", "MenuItemID", [
		"name",
		"desc"
	]),
	MealPlanning: new TableClass(db, "MealPlanning", "MealPlanningID", [
		"name",
		"desc"
	])
})
