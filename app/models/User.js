import SQL from '../database/SQL';
import Request from './Request';
import Model from './Model';


const query = { text: null, values: null };
class User extends Model {
  constructor(currUser) {
    super('users', currUser);
  }

  static create(properties) {
    const {
      firstName, lastName, email, phone, password, address,
    } = properties;

    query.text = 'INSERT INTO users (id, first_name, last_name, phone, email, password, address, is_admin, created_at, updated_at) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    query.values = [firstName, lastName, phone, email,
      password, address, false, new Date().toISOString(), new Date().toISOString()];
    return new Promise(async (resolve, reject) => {
      try {
        const res = await SQL.query(query);
        resolve(new User(res.rows[0]));
      } catch (err) {
        reject(err);
      }
    });
  }

  static getByEmail(email) {
    const sqlQuery = `SELECT * FROM users WHERE email = '${email}'`;
    return new Promise(async (resolve, reject) => {
      try {
        const results = await SQL.query(sqlQuery);

        const users = results.rows.map(res => new User(res));

        resolve(users);
      } catch (err) {
        reject(err);
      }
    });
  }


  static getByPhone(phone) {
    const sqlQuery = `SELECT * FROM users WHERE phone = '${phone}'`;
    return new Promise(async (resolve, reject) => {
      try {
        const results = await SQL.query(sqlQuery);

        const users = results.rows.map(res => new User(res));

        resolve(users);
      } catch (err) {
        reject(err);
      }
    });
  }


  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await SQL.query(`SELECT * FROM users WHERE id = ${id}`);
        const users = results.rows.map(res => new User(res));
        resolve(users[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  getMyRequests() {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await SQL.query(`SELECT * FROM requests WHERE user_id = ${this.id}`);
        const requests = results.rows.map(res => new Request(res));
        resolve(requests);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default User;
