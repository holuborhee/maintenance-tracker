import { Request } from '../models';
import SQL from './SQL';

const faker = require('faker');

const length = Array(11).fill().map((x, i) => i + 1);


const requests = length.map(len => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  address: `${faker.address.secondaryAddress()} ${faker.address.country()}`,
  current_status: 'RESOLVED',
  requested_on: new Date().toISOString(),
  request_urgency: 24,
  user_id: 4,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));


class SeedRequest {
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
      await SQL.query(buildStatement('INSERT INTO requests (title, description, address, current_status, requested_on, request_urgency, user_id, created_at, updated_at) VALUES ', requests));
    } catch (ex) {
      console.log(`Something went wrong somewhere ${ex}`);
    }
  }

  static down() {

  }
}


SeedRequest.up();
