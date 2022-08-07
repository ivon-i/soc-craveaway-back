import express, { query } from 'express';
import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';
import { postImage, getImage } from '../models/cloudinary.js';

const imageRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

imageRouter.get('/', (req, res) => {
  res.json({ message: 'Hey! This is your server response!' });
});

imageRouter.post('/retrieve-image', async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      image: req.body.image,
    };
    // const data = req.body;
    const uploadedResponse = await cloudinary.uploader.upload(data.image);
    const result = await postImage(data.title, uploadedResponse);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.error(error.message);
  }
});

imageRouter.get('/retrieve-image/:cloudinary_id', async (req, res) => {
  // data from user
  try {
    const { cloudinary_id } = req.params;
    const result = await getImage(cloudinary_id);
    res.json({ success: true, payload: result });
  } catch (error) {
    console.error(error.message);
  }
});

// YOUTUBE MAN SHIT

// app.get('/api/cloudinary', async (req, res) => {
//   const { resources } = await cloudinary.search
//     .expression('folder:dev_setups')
//     .sort_by('public_id', 'desc')
//     .max_results(30)
//     .execute();

//   const publicIds = resources.map((file) => file.public_id);
//   res.send(publicIds);
// });

// app.post('/api/images', async (req, res) => {
//   try {
//   const imageStr = req.body.data;
//   const uploadedResponse = await cloudinary.uploader.upload(imageStr);
//     res.json({data: uploadedResponse})
//   } catch (error){
//     console.error(error)
//   }
// })

export default imageRouter;
