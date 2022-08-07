import express from 'express';
// import recRouter from './routes/recipes.js';
// import favRouter from './routes/users.js';
// import imageRouter from './routes/images.js'
import cors from 'cors';
import bodyParser from 'body-parser';
// import cloudinary from './cloudinary.js';
import { v2 as cloudinary } from 'cloudinary';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// app.use('/recipes', recRouter);
// app.use('/fav', favRouter);
// app.use('/api/images', function (req, res, next) {
//   res.json({ message: "Hi" });
// });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.get('/', (req, res) => {
  res.json({ message: 'Hey! This is your server response!' });
});

app.post('/image-upload', (request, response) => {
  // collected image from a user
  const data = {
    image: request.body.image,
  };

  // upload image here
  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      response.status(200).send({
        message: 'success',
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: 'failure',
        error,
      });
    });
});

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
//     const imageStr = req.body.data;
//     console.log(imageStr)
//   const uploadedResponse = await cloudinary.uploader.upload(imageStr, {
//     upload_preset: 'ml_default',
//   });
//     res.json({data: uploadedResponse})
//   } catch (error){
//     console.error(error)
//   }
// })

// app.use(function (req, res, next) {
//   res.status(404).json({ message: "Couldn't find that for ya matey" });
// });

// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).json(err);
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// cloudinary

export default app;
