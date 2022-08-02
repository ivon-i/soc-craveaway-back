import { query } from "../db/index.js";

export async function getRecipes() {
  const data = await query(`SELECT * FROM recipes;`);
  return data.rows;
}

export async function postRecipe(newRecipe) {
    const { title, author, description, time, cost, ingredients, image, serves, rating, rating_entries } = newRecipe;
  const data = await query(
    `INSERT INTO recipes (title, author, description, time, cost, nutrition, ingredients, image, serves, rating, rating_entries) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`,
    [title, author, description, time, cost, ingredients, image, serves, rating, rating_entries]
  );
  return data.rows;
}

// export async function updateTicket(id, updatedTicket) {
//   const { name, roomnumber, message, keywords, status } = updatedTicket;
//   const data = await query(
//     `UPDATE tickets SET name = $1, roomnumber = $2, message = $3, keywords = $4, status = $5 WHERE  ticket_id = $6 RETURNING *;`,
//     [name, roomnumber, message, keywords, status, Number(id)]
//   );
//   return data.rows;
// }

// export async function updateStatus(id, updatedStatus) {
//   const { status } = updatedStatus;
//   const data = await query(
//     `UPDATE tickets SET status = $1 WHERE ticket_id = $2 RETURNING *;`,
//     [status, Number(id)]
//   );
//   return data.rows;
// }

// export async function deleteTicket(id) {
//   console.log("delete");
//   const data = await query(
//     `DELETE FROM tickets WHERE ticket_id = $1 RETURNING *`,
//     [Number(id)]
//   );
//   return data.rows;
// }
