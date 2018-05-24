import SQL from '../database/SQL';


const query = { text: null, values: null };
class User {
  constructor(currUser) {
    this.id = currUser.id;
    this.name = currUser.name;
    this.address = currUser.address;
    this.phone = currUser.phone;
    this.email = currUser.email;
    this.password = currUser.password;
  }

  static create(properties) {
    const {
      first_name, last_name, email, phone, password, address, is_admin,
    } = properties;

    query.text = 'INSERT INTO users (id, first_name, last_name, phone, email, password, address, is_admin, created_at, updated_at) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)';
    query.values = [first_name, last_name, phone, email,
      password, address, is_admin, new Date().toISOString(), new Date().toISOString()];
    return new Promise(async (resolve, reject) => {
      SQL.query(query)
        .then(res => console.log(res))
        .catch(e => console.error(e.stack));
      /* try {
        const res = await SQL.query(query);
        console.log(res.rows[0]);
        // resolve(new User(res.rows[0]));
      } catch (err) {
        reject(err);
      } */
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
