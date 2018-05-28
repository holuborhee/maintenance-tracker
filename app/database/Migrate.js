import fs from 'fs';
import SQL from './SQL';


class Migrate {
  static createTables() {
    fs.readFile('app/database/migrateTables.sql', async (err, data) => {
      if (err) {
        throw err;
      } else {
        const sqlFile = data.toString('utf8');
        try {
          await SQL.query(sqlFile);
        } catch (e) {
          throw e;
        }
      }
    });
  }

  static dropTables() {
    // Function to bring down all tables

  }
}


Migrate.createTables();
