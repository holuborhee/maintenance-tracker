import SQL from '../database/SQL';

class Model {
  constructor(databaseTable, tableColumns) {
    this.table = databaseTable;
    if (Object.keys(tableColumns).length > 0) {
      Object.keys(tableColumns).forEach((key) => {
        let field = key;
        if (key.includes('_')) { field = Model.convertToClassField(key); }
        this[field] = tableColumns[key];
      });
    }
  }


  static async all() {
    try {
      return await this.performQuery(`SELECT * FROM ${this.table}`);
    } catch (ex) {
      return ex;
    }
  }


  static async where(table, column, operation = '=', value) {
    try {
      const results = await this.performQuery(`SELECT * FROM ${table} WHERE ${column} ${operation} ${value}`);
      return results;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  static performQuery(query) {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await SQL.query(query);
        resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  }

  static convertToClassField(column) {
    return column.replace(/(_\w)/, match => match.charAt(1).toUpperCase());
  }

  static revertToTableColumn(field) {
    return field.replace(/[A-Z]/, match => `_${match.toLowerCase()}`);
  }
}

export default Model;
