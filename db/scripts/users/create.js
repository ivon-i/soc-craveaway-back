import { query } from '../../index.js';

async function createFavTable() {
  const res = await query(
    `CREATE TABLE IF NOT EXISTS favourites (recipe_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title TEXT, author TEXT, description TEXT, time TEXT, cost TEXT, nutrition TEXT, ingredients TEXT, image TEXT, serves INT, rating INT, rating_entries INT, shoppingList TEXT, userName TEXT);`
  );
  console.log(res.command, 'favourites table created');
}

createFavTable();
