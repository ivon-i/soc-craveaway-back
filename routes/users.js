import express, { query } from 'express';
const favRouter = express.Router();

import { getFav, postFavRecipe } from '../models/users.js';

favRouter.get('/fav', async (req, res) => {
  try {
    let result = await getFav();
    res.json({ success: true, payload: result });
  } catch (error) {
    console.error(error.message);
  }
});

favRouter.post('/fav', async function (req, res) {
  const newRecipe = req.body;
  const result = await postFavRecipe(newRecipe);
  res.json({ success: true, payload: result });
});
