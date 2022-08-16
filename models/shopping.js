import { query } from '../db/index.js';

//getting all items based on username
export async function getShop(name) {
  const data = await query(`SELECT * FROM shopping WHERE username = $1;`, [name]);
  return data.rows;
}
//posting shopping list item
export async function postShopItem(newItem) {
  const { username, item } = newItem;
  const data = await query(
    `INSERT INTO shopping (username, item) VALUES ($1, $2) RETURNING *;`,
    [username, item]
  );
  return data.rows;
};
//deleting a single item off users' list 
export async function deleteShop(id) {
    const data = await query(
      `DELETE FROM shopping WHERE item_id = $1 RETURNING *`,
      [Number(id)]
    );
    return data.rows;
  };
  
