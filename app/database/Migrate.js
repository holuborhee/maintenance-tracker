import fs from 'fs';
import SQL from './SQL';


class Migrate {
  static up() {
    fs.readFile('app/database/migrateTables.sql', async (err, data) => {
      if (err) { console.log(`Error occured ${err}`); } else {
        console.log('here');
        const sqlFile = data.toString('utf8');
        try {
          await SQL.query(sqlFile);
        } catch (e) {
          console.log(e);
          throw e;
        } finally {
          console.log('finally');
        }
      }
    });
  }

  static down() {
    // Function to bring down all tables

  }
}


Migrate.up();
