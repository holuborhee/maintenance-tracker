import SQL from '../database/SQL';


const query = { text: null, values: null };
class User {
  constructor(currUser) {
    this.id = currUser.id;
    this.firstName = currUser.first_name;
    this.lastName = currUser.last_name;
    this.address = currUser.address;
    this.phone = currUser.phone;
    this.email = currUser.email;
    this.password = currUser.password;
    this.isAdmin = currUser.is_admin;
    this.createdAt = currUser.created_at;
    this.updatedAt = currUser.updated_at;
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


  static all() {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await SQL.query('SELECT * FROM users');
        const users = results.rows.map(res => new User(res));
        resolve(users);
      } catch (err) {
        reject(err);
      }
    });
  }
/*
  static findById(id) {
    const thisUser = users.find(user => user.id === parseInt(id, 10));
    if (!thisUser) {
      throw new Error('User resource not found on the server');
    }
    return new User(thisUser);
  }
*/
}

export default User;
