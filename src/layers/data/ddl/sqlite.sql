DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	UserID INTEGER PRIMARY KEY,
	name VARCHAR(128),
	email VARCHAR(128),
	username VARCHAR(128),
	password VARCHAR(256)
);
CREATE INDEX Users_name_index ON Users(name);

DROP TABLE IF EXISTS Ingredients;
CREATE TABLE Ingredients (
	IngredientID INTEGER PRIMARY KEY,
	name VARCHAR(128),
	desc VARCHAR(512)
);
CREATE INDEX Ingredients_name_index ON Ingredients(name);

DROP TABLE IF EXISTS Products;
CREATE TABLE Products (
	ProductID INTEGER PRIMARY KEY,
	name VARCHAR(128),
	desc VARCHAR(512)
);
CREATE INDEX Products_name_index ON Products(name);

DROP TABLE IF EXISTS MenuItems;
CREATE TABLE MenuItems (
	MenuItemID INTEGER PRIMARY KEY,
	name VARCHAR(128),
	desc VARCHAR(512)
);
CREATE INDEX MenuItems_name_index ON MenuItems(name);

DROP TABLE IF EXISTS MealPlanning;
CREATE TABLE MealPlanning (
	MealPlanningID INTEGER PRIMARY KEY,
	name VARCHAR(128),
	desc VARCHAR(512)
);
CREATE INDEX MealPlanning_name_index ON MealPlanning(name);

DROP TABLE IF EXISTS Recipes;
CREATE TABLE Recipes (
	RecipeID INTEGER PRIMARY KEY,
	IngredientID INTEGER,
	ProductID INTEGER,
	MenuItemID INTEGER,
	MealPlanningID INTEGER,
	UserID INTEGER,
	name VARCHAR(128),
	desc VARCHAR(128),
	CONSTRAINT Recipes_Ingredients_fk FOREIGN KEY(IngredientID) REFERENCES Ingredients(IngredientID),
	CONSTRAINT Recipes_Products_fk FOREIGN KEY(ProductID) REFERENCES Products(ProductID),
	CONSTRAINT Recipes_MenuItems_fk FOREIGN KEY(MenuItemID) REFERENCES MenuItems(MenuItemID),
	CONSTRAINT Recipes_MealPlanning_fk FOREIGN KEY(MealPlanningID) REFERENCES MealPlanning(MealPlanningID),
	CONSTRAINT Recipes_Users_fk FOREIGN KEY(UserID) REFERENCES Users(UserID)
);
CREATE INDEX Recipes_name_index ON Recipes(name);
