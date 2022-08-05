import { query2 } from "../../index.js";

async function dropFavTable() {
    const res = await query2(`DROP TABLE IF EXISTS favourites;`);
  console.log(res.command, "dropped favourites table");
}

dropFavTable();
