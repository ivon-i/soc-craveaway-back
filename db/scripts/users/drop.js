import { query } from "../../index.js";

async function dropFavTable() {
    const res = await query(`DROP TABLE IF EXISTS favourites;`);
  console.log(res.command, "dropped favourites table");
}

dropFavTable();
