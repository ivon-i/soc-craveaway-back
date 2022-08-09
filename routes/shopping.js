import express from 'express';
const shopRouter = express.Router();

import { getShop, postShopItem, deleteShop } from '../models/shopping.js';

shopRouter.get('/', async (req, res) => {
  try {
    if (req.query.username !== undefined) {
      const name = req.query.username;
      const result = await getShop(name);
      res.json({ success: true, payload: result });
      return;
    }
  } catch (error) {
    console.error(error.message);
  }
});

shopRouter.post('/list', async function (req, res) {
  const newItem = req.body;
  const result = await postShopItem(newItem);
  res.json({ success: true, payload: result });
});

shopRouter.delete('/:id', async function (req, res) {
  const id = Number(req.params.id);
  const result = await deleteShop(id);
  res.json({ success: true, payload: result });
});

export default shopRouter;