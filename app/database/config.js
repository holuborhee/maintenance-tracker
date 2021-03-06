import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
  },
  test: {
    database: process.env.DB_DATABASE_TEST,
  },
  production: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },

};

export default config;
