import { query } from "../index.js";

async function truncateRecipesTable() {
  const res = await query(`TRUNCATE TABLE recipes;`);
  console.log(res.command, "cleared (truncated) recipes table");
}

truncateRecipesTable();