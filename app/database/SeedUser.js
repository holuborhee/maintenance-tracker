import bcrypt from 'bcrypt';
import faker from 'faker';

import SQL from './SQL';


const length = Array(11).fill().map((x, i) => i + 1);

const users = length.map((len, i) => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  phone: i === 0 ? '08164488989' : faker.phone.phoneNumber(),
  email: i === 0 ? 'daveholuborhee@gmail.com' : faker.internet.email(),
  address: `${len} ${faker.address.secondaryAddress()} ${faker.address.country()}`,
  password: `${bcrypt.hashSync('password', 10)}`,
  is_admin: i === 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));


class SeedUser {
  static buildStatement(insert, rows) {
    const params = [];
    const chunks = [];
    rows.forEach((row) => {
      const valueClause = [];
      Object.keys(row).forEach((p) => {
        params.push(row[p]);
        valueClause.push(`$${params.length}`);
      });
      chunks.push(`(${valueClause.join(', ')})`);
    });
    return {
      text: insert + chunks.join(', '),
      values: params,
    };
  }
  static async up() {
    try {
      const res = await SQL.query(SeedUser.buildStatement('INSERT INTO users (first_name, last_name, phone, email, address, password, is_admin, created_at, updated_at) VALUES ', users));
      return res;
    } catch (ex) {
      return `It went wrong somewhere ${ex}`;
    }
  }

  static down() {
    // Implement clear User table here

  }
}


SeedUser.up();
