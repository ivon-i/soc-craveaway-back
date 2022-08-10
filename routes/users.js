import express from 'express';
const favRouter = express.Router();

import { getFav, postFavRecipe, deleteFav } from '../models/users.js';

favRouter.get('/', async (req, res) => {
  try {
    if (req.query.userName !== undefined) {
      const name = req.query.userName;
      let result = await getFav(name);
      res.json({ success: true, payload: result });
      return;
    }
  } catch (error) {
    console.error(error.message);
  }
});

favRouter.post('/create', async function (req, res) {
  const newRecipe = req.body;
  const result = await postFavRecipe(newRecipe);
  res.json({ success: true, payload: result });
});

favRouter.delete('/:id', async function (req, res) {
  const id = Number(req.params.id);
  const result = await deleteFav(id);
  res.json({ success: true, payload: result });
});

export default favRouter;
