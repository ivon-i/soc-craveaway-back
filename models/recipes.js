//import { DataRowMessage } from 'pg-protocol/dist/messages.js';
import { v2 as cloudinary } from 'cloudinary';
import { query } from '../db/index.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//getting all recipes 
export async function getRecipes() {
  const data = await query(`SELECT * FROM recipes;`);
  return data.rows;
}

//getting all recipes based on id
export async function getbyID(id) {
  const data = await query(`SELECT * FROM recipes where recipe_id = $1;`, [id]);
  return data.rows;
}

//getting all recipes based on search input
export async function getBySearch(input) {
  const data = await query(`SELECT * FROM recipes
  WHERE title LIKE '${input}%' or author LIKE '${input}%' or description LIKE '${input}%' or nutrition LIKE '${input}%' or ingredients LIKE '${input}%';`);
  return data.rows;
}

//creating a new recipe via form 
export async function createNewRecipe(newRecipe, imageData) {
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
  } = newRecipe;
  const data = await query(
    `INSERT INTO recipes (title, author, description, time, cost, nutrition, ingredients, image, serves, rating, rating_entries, cloudinary_id, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;`,
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
      imageData.public_id,
      imageData.secure_url,
    ]
  );
  return data.rows;
}

export async function updateRating(id, updated) {
  const { rating } = updated;
  const data = await query(
    `UPDATE recipes SET rating = $1 , rating_entries = rating_entries + 1 WHERE recipe_id = $2 RETURNING *;`,
    [rating, id]
  );
  return data.rows;
}
//currently calculates average of all ratings in db
export async function calculateAvg() {
  const data = await query(`SELECT AVG(ALL rating) FROM recipes`);
  return data.rows;
}