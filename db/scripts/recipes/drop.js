import { query } from "../../index.js";

async function dropRecipesTable() {
    const res = await query(`DROP TABLE IF EXISTS recipes;`);
  console.log(res.command, "dropped recipes table");
}

dropRecipesTable();
