DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	UserID INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(128),
	email VARCHAR(128),
	username VARCHAR(128),
	password VARCHAR(256),
	CONSTRAINT Users_pk PRIMARY KEY(UserId)
);
CREATE INDEX Users_name_index ON Users(name);

DROP TABLE IF EXISTS Ingredients;
CREATE TABLE Ingredients (
	IngredientID INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(128),
	desc VARCHAR(512),
	CONSTRAINT Ingredients_pk PRIMARY KEY(IngredientID)
);
CREATE INDEX Ingredients_name_index ON Ingredients(name);

DROP TABLE IF EXISTS Products;
CREATE TABLE Products (
	ProductID INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(128),
	desc VARCHAR(512),
	CONSTRAINT Products_pk PRIMARY KEY(ProductID)
);
CREATE INDEX Products_name_index ON Products(name);

DROP TABLE IF EXISTS MenuItems;
CREATE TABLE MenuItems (
	MenuItemID INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(128),
	desc VARCHAR(512),
	CONSTRAINT MenuItems_pk PRIMARY KEY(MenuItemID)
);
CREATE INDEX MenuItems_name_index ON MenuItems(name);

DROP TABLE IF EXISTS MealPlanning;
CREATE TABLE MealPlanning (
	MealPlanningID INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(128),
	desc VARCHAR(512),
	CONSTRAINT MealPlanning_pk PRIMARY KEY(MealPlanningID)
);
CREATE INDEX MealPlanning_name_index ON MealPlanning(name);

DROP TABLE IF EXISTS Recipes;
CREATE TABLE Recipes (
	RecipeID INT NOT NULL AUTO_INCREMENT,
	IngredientID INTEGER,
	ProductID INTEGER,
	MenuItemID INTEGER,
	MealPlanningID INTEGER,
	UserID INTEGER,
	name VARCHAR(128),
	desc VARCHAR(128),
	CONSTRAINT Recipes_pk PRIMARY KEY(RecipeID),
	CONSTRAINT Recipes_Ingredients_fk FOREIGN KEY(IngredientID) REFERENCES Ingredients(IngredientID),
	CONSTRAINT Recipes_Products_fk FOREIGN KEY(ProductID) REFERENCES Products(ProductID),
	CONSTRAINT Recipes_MenuItems_fk FOREIGN KEY(MenuItemID) REFERENCES MenuItems(MenuItemID),
	CONSTRAINT Recipes_MealPlanning_fk FOREIGN KEY(MealPlanningID) REFERENCES MealPlanning(MealPlanningID),
	CONSTRAINT Recipes_Users_fk FOREIGN KEY(UserID) REFERENCES Users(UserID)
);
CREATE INDEX Recipes_name_index ON Recipes(name);
