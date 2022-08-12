import { query } from "../../index.js";
import { data } from "../../../libs/recipeData.js";

   
async function populateRecipesTable() {
  for (let i = 0; i < data.length; i++) {
    const res = await query(
      `INSERT INTO recipes (title, author, description, time, cost, nutrition, ingredients, image, serves, rating, rating_entries, cloudinary_id, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;`,
      [
        data[i].title,
        data[i].author,
        data[i].description,
        data[i].time,
        data[i].cost,
        data[i].nutrition,
        data[i].ingredients,
        data[i].image,
        data[i].serves,
        data[i].rating,
        data[i].rating_entries,
        data[i].cloudinary_id,
        data[i].image_url,
      ]
    );
    console.log(`Added to DB`);
  }
}

populateRecipesTable();
