import pg from 'pg';
import { db } from '../config/index.js';

export const pool = new pg.Pool({
  connectionString: db.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// const pool2 = new pg.Pool({
//   connectionString: db2.FAV_URL,
//   ssl: { rejectUnauthorized: false },
// });

export function query(text, params, callback) {
  return pool.query(text, params, callback);
}

// export function query2(text, params, callback) {
//   return pool2.query(text, params, callback);
// }
