import db from '../../lib/db';

const { users } = db;
class User {
  constructor(currUser) {
    this.id = currUser.id;
    this.name = currUser.name;
    this.address = currUser.address;
    this.phone = currUser.phone;
    this.email = currUser.email;
    this.password = currUser.password;
  }

  static findById(id) {
    const thisUser = users.find(user => user.id === parseInt(id, 10));
    if (!thisUser) {
      throw new Error('User resource not found on the server');
    }
    return new User(thisUser);
  }
}

export default User;
