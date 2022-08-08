import express from 'express';
import recRouter from './routes/recipes.js';
import favRouter from './routes/users.js';
// import imageRouter from './routes/cloudinary.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }))

app.use('/recipes', recRouter);
app.use('/fav', favRouter);
// app.use('/images', imageRouter);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


app.use(function (req, res, next) {
  res.status(404).json({ message: "Couldn't find that for ya matey" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// cloudinary

export default app;
