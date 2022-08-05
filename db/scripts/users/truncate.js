import { query2 } from "../index.js";

async function truncateFavTable() {
  const res = await query2(`TRUNCATE TABLE favourites;`);
  console.log(res.command, "cleared (truncated) favourites table");
}

truncateFavTable();