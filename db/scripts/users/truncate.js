import { query } from "../index.js";

async function truncateFavTable() {
  const res = await query(`TRUNCATE TABLE favourites;`);
  console.log(res.command, "cleared (truncated) favourites table");
}

truncateFavTable();