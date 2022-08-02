import { query } from "../../index.js";

async function createRecipesTable() {
  const res = await query(
    `CREATE TABLE IF NOT EXISTS recipes (recipe_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title TEXT, author TEXT, description TEXT, time TEXT, cost TEXT, nutrition TEXT, ingredients TEXT, image TEXT, serves INT, rating INT, rating_entries INT);`
  );
  console.log(res.command, "recipes table created");
}

createRecipesTable();
