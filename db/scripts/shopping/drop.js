import { query } from "../../index.js";

async function dropShopTable() {
    const res = await query(`DROP TABLE IF EXISTS shopping;`);
  console.log(res.command, "dropped shopping table");
}

dropShopTable();
