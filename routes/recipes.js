import express, { query } from 'express';
// import bodyParser from "body-parser";
const recRouter = express.Router();
// const jsonParser = bodyParser.json();

import {
  getRecipes,
  postRecipe,
  getbyID,
  getBySearch,
  //   deleteTicket,
} from '../models/recipes.js';

recRouter.post(
  '/',
  /*jsonParser,*/ async function (req, res) {
    const newRecipe = req.body;
    const result = await postRecipe(newRecipe);
    res.json({ success: true, payload: result });
  }
);

recRouter.get('/:id', async (req, res) => {
  try {
    let id = Number(req.params.id);
    const result = await getbyID(id);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.error(error.message);
  }
});

recRouter.get('/', async (req, res) => {
  try {
    if (req.query.search !== undefined) {
      const search = req.query.search;
      const result = await getBySearch(search);
      res.json({ success: true, payload: result });
      return;
    }
    let result = await getRecipes();
    res.json({ success: true, payload: result });
  } catch (error) {
    console.error(error.message);
  }
});

recRouter.post("/create", async (req, res) => {
  const author = req.body.author;
  const title= req.body.title;
  const description = req.body.description;
  const cost = req.body.cost;
  const time = req.body.time;
  const nutrition= req.body.nutrition;
  const ingredients = req.body.ingredients;
  const image = req.body.image;
  const serves = req.body.serves;
  const rating = req.body.rating;
  const rating_entries = req.body.rating_entries;
  if (!author || !title || !description || !cost || !time || !nutrition || !ingredients || !serves || !rating || !rating_entries) {
    res.json({ sucess: false, reason: "incorrect data input" });
  } else {
    const result = await createNewRecipe(author, title, description, cost, time, nutrition, ingredients, serves, rating, rating_entries);
    res.json({ success: true, data: result });
  }
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
