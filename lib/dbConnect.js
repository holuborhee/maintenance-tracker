import { Pool, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.NODE_ENV === 'test' ? process.env.PGDATABASE_TEST : process.env.PGDATABASE;
// pools will use environment variables
// for connection information
const pool = new Pool({
  user: process.env.PGUSER,
  database,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

