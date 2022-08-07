import express from 'express';
// import recRouter from './routes/recipes.js';
// import favRouter from './routes/users.js';
import imageRouter from './routes/cloudinary.js'
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

// app.use('/recipes', recRouter);
// app.use('/fav', favRouter);
app.use('/images', imageRouter);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// FOR POST TO DATABASE ATTEMPT 
// app.post("/persist-image", (request, response) => {
//   // collected image from a user
//   const data = {
//     title: request.body.title,
//     image: request.body.image
//   }

//   // upload image here
//   cloudinary.uploader.upload(data.image)
//   .then((image) => {
//     db.pool.connect((err, client) => {
//       // inset query to run if the upload to cloudinary is successful
//       const insertQuery = `INSERT INTO images (title, cloudinary_id, image_url) VALUES($1,$2,$3) RETURNING *`;
//       const values = [data.title, image.public_id, image.secure_url];

//       // execute query
//       client.query(insertQuery, values)
//       .then((result) => {
//         result = result.rows[0];

//         // send success response
//         response.status(201).send({
//           status: "success",
//           data: {
//             message: "Image Uploaded Successfully",
//             title: result.title,
//             cloudinary_id: result.cloudinary_id,
//             image_url: result.image_url,
//           },
//         })
//       }).catch((e) => {
//         response.status(500).send({
//           message: "failure",
//           e,
//         });
//       })
//     })  
//   }).catch((error) => {
//     response.status(500).send({
//       message: "failure",
//       error,
//     });
//   });
// });


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
