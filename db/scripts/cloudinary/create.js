import { query } from '../../index.js';

async function createPicturesTable() {
  const res = await query(
      `CREATE TABLE IF NOT EXISTS pictures (image_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title VARCHAR(128) NOT NULL, cloudinary_id VARCHAR(128) NOT NULL, image_url VARCHAR(128) NOT NULL);`
      //image_id, title, cloudinary_id, image_url
  );
  console.log(res.command, 'pictures table created');
}

createPicturesTable();
