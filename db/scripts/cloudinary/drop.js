import { query } from '../../index.js';

async function dropPicturesTable() {
  const res = await query(`DROP TABLE IF EXISTS pictures;`);
  console.log(res.command, 'dropped pictures table');
}

dropPicturesTable();
