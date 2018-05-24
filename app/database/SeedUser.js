import { User } from '../models';
import SQL from './SQL';

const bcrypt = require('bcrypt');
const faker = require('faker');


const length = Array(11).fill().map((x, i) => i + 1);

const users = length.map(len => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  address: `${faker.address.secondaryAddress()} ${faker.address.country()}`,
  password: `${bcrypt.hashSync('password', 10)}`,
  is_admin: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));


class SeedUser {
  static async up() {
    function buildStatement(insert, rows) {
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
    try {
      await SQL.query(buildStatement('INSERT INTO users (first_name, last_name, phone, email, address, password, is_admin, created_at, updated_at) VALUES ', users));
    } catch (ex) {
      console.log(`It went rong somewhere ${ex}`);
    }
  }

  static down() {

  }
}


SeedUser.up();
