import { Pool } from 'pg';
import config from './config';

const env = process.env.NODE_ENV || 'development';


const dbConfig = config[env];

const SQL = new Pool(dbConfig);


export default SQL;

