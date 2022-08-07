import { v2 as cloudinary } from 'cloudinary';
import { query } from '../db/index.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


export async function postImage(title, imageData) {
const data = await query(
  `INSERT INTO pictures (title, cloudinary_id, image_url) VALUES($1,$2,$3) RETURNING *;`,
  [title, imageData.public_id, imageData.secure_url]
);
    return data.rows;
};

export async function getImage(cloudinary_id) {
    const data = await query(`SELECT * FROM pictures WHERE cloudinary_id = $1;`, [cloudinary_id]);
    return data.rows;
}

