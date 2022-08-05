import { query } from '../db/index.js';

export async function getFav() {
  const data = await query(`SELECT * FROM favourites;`);
  return data.rows;
}

export async function postFavRecipe(newRecipe) {
  const {
    title,
    author,
    description,
    time,
    cost,
    nutrition,
    ingredients,
    image,
    serves,
    rating,
    rating_entries,
    shoppingList,
    userName,
  } = newRecipe;

  const data = await query(
    `INSERT INTO favourites (title, author, description, time, cost, nutrition, ingredients, image, serves, rating, rating_entries, shoppingList, userName) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;`,
    [
      title,
      author,
      description,
      time,
      cost,
      nutrition,
      ingredients,
      image,
      serves,
      0,
      0,
      shoppingList,
      userName,
    ]
  );
  return data.rows;
}
