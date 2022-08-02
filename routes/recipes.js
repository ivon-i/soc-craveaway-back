import express from "express";
// import bodyParser from "body-parser";
const recRouter = express.Router();
// const jsonParser = bodyParser.json();

import {
  getRecipes,
  postRecipe
//   updateTicket,
//   updateStatus,
//   deleteTicket,
} from "../models/recipes.js";

recRouter.get("/", async function (req, res) {
  const result = await getRecipes();
  res.json({ success: true, payload: result });
});

recRouter.post("/", /*jsonParser,*/ async function (req, res) {
  const newRecipe = req.body;
  const result = await postRecipe(newRecipe);
  res.json({ success: true, payload: result });
});

// router.put("/:id", async function (req, res) {
//   const id = Number(req.params.id);
//   const data = req.body;
//   const result = await updateTicket(id, data);
//   res.json({ success: true, payload: result });
// });

// router.patch("/:id", async function (req, res) {
//   const id = Number(req.params.id);
//   const data = req.body;
//   const result = await updateStatus(id, data);
//   res.json({ success: true, payload: result });
// });

// recRouter.delete("/:id", async function (req, res) {
//   const id = Number(req.params.id);
//   const result = await deleteTicket(id);
//   res.json({ success: true, payload: result });
// });

export default recRouter;
