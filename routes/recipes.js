import express, { query } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { getFav, postFavRecipe } from '../models/users.js';
import {
  getRecipes,
  // postRecipe,
  getbyID,
  getBySearch,
  createNewRecipe,
  updateRating,
  calculateAvg,
} from '../models/recipes.js';

const recRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// recRouter.post(
//   '/', async function (req, res) {
//     const newRecipe = req.body;
//     const result = await postRecipe(newRecipe);
//     res.json({ success: true, payload: result });
//   });

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
    let rating = await calculateAvg();
    res.json({ success: true, payload: result, average: rating });
  } catch (error) {
    console.error(error.message);
  }
});

recRouter.post('/create', async (req, res) => {
  const newRecipe = req.body;
  if (
    !newRecipe.author ||
    !newRecipe.title ||
    !newRecipe.description ||
    !newRecipe.cost ||
    !newRecipe.time ||
    !newRecipe.nutrition ||
    !newRecipe.ingredients ||
    !newRecipe.serves //||
    // !newRecipe.imagestring
  ) {
    res.json({ sucess: false, reason: 'incorrect data input' });
  } else {
    const imageData = await cloudinary.uploader.upload(newRecipe.imagestring);
    const result = await createNewRecipe(newRecipe, imageData);
    res.json({ success: true, data: result });
  }
});

recRouter.patch('/:id', async function (req, res) {
  const id = Number(req.params.id);
  const data = req.body;
  const result = await updateRating(id, data);
  res.json({ success: true, payload: result });
});

export default recRouter;