import { query } from '../../index.js';

async function createShopTable() {
  const res = await query(
    `CREATE TABLE IF NOT EXISTS shopping (item_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username TEXT, item TEXT);`
  );
  console.log(res.command, 'shopping table created');
}

createShopTable();
