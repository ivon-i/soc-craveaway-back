import { query } from "../../index.js";
import { data } from "../../../libs/recipeData.js";

async function populateRecipesTable() {
  for (let i = 0; i < data.length; i++) {
    const res = await query(
      `INSERT INTO tickets (name, roomnumber, message, keywords, status) VALUES ($1, $2, $3, $4, $5);`,
      [
        tickets[i].name,
        tickets[i].roomnumber,
        tickets[i].message,
        tickets[i].keywords,
        tickets[i].status,
      ]
    );
    console.log(`Added to DB: ${res.rows[0].ticket}`);
  }
}

populateRecipesTable();
