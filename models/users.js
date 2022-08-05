import { query2 } from '../db';

export async function getFav() {
  const data = await query2(`SELECT * FROM favourites;`);
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
  } = newRecipe;

  const data = await query2(
    `INSERT INTO favourites (title, author, description, time, cost, nutrition, ingredients, image, serves, rating, rating_entries, shoppingList) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;`,
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
    ]
  );
  return data.rows;
}
