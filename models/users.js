import { query } from '../db/index.js';


//getting all favourited recipes based on username
export async function getFav(name) {
  const data = await query(`SELECT * FROM favourites WHERE userName = $1;`, [name]);
  return data.rows;
}

//posting favourited recipe into Fav table
export async function postFavRecipe(newRecipe) {
  const {
    recipe_id,
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

  // const data = await query(

  const data = await query(`SELECT * FROM favourites WHERE recipe_id=$1`, [
    newRecipe.recipe_id,
  ]);
 let favs;
  if (data.rows.length > 0) {
  favs = true;
  console.log("not posted")
  } else {
   const newFav = await query( `INSERT INTO favourites (recipe_id, title, author, description, time, cost, nutrition, ingredients, image, serves, rating, rating_entries, shoppingList, userName) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`,
      [
        recipe_id,
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
      ])
      favs = newFav.rows;
  }
  return favs;
}


//deleting a single recipes off users'favourites

export async function deleteFav(id) {
  const data = await query(
    `DELETE FROM favourites WHERE recipe_id = $1 RETURNING *`,
    [Number(id)]
  );
  return data.rows;
}
