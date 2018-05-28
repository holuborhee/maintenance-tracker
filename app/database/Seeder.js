import bcrypt from 'bcrypt';
import faker from 'faker';
import validator from 'validator';

import SQL from './SQL';


const lengthArray = Array(11).fill();


const requestsArray = lengthArray.map((len, i) => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  address: `${faker.address.secondaryAddress()} ${faker.address.country()}`,
  current_status: 'UNRESOLVED',
  requested_on: new Date().toISOString(),
  max_hour: 24,
  user_id: i + 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));


const usersArray = lengthArray.map((len, i) => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  phone: i === 0 ? '08164488989' : faker.phone.phoneNumber(),
  email: i === 0 ? 'daveholuborhee@gmail.com' : validator.normalizeEmail(faker.internet.email()),
  address: `${i + 1} ${faker.address.secondaryAddress()} ${faker.address.country()}`,
  password: `${bcrypt.hashSync('password', 10)}`,
  is_admin: i === 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

class Seeder {
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


  static async fillTables() {
    const client = await SQL.connect();
    try {
      await client.query('BEGIN');
      await client.query(Seeder.buildStatement('INSERT INTO users (first_name, last_name, phone, email, address, password, is_admin, created_at, updated_at) VALUES ', usersArray));
      await client.query(Seeder.buildStatement('INSERT INTO requests (title, description, address, current_status, requested_on, max_hour, user_id, created_at, updated_at) VALUES ', requestsArray));
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  static clearTables() {
    // Implement clear Tables here
  }
}


Seeder.fillTables();
