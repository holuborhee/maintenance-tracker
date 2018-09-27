import SQL from '../database/SQL';
import Model from './Model';


class Request extends Model {
  constructor(currRequest) {
    super('requests', currRequest);
  }

  static create(properties) {
    const newRequest = properties;

    newRequest.requestedOn = new Date().toISOString();
    newRequest.createdAt = new Date().toISOString();
    newRequest.updatedAt = new Date().toISOString();

    if (newRequest.maxHour <= 24) {
      newRequest.maxHour = 24;
    } else if (newRequest.maxHour <= 72) {
      newRequest.maxHour = 72;
    } else {
      newRequest.maxHour = 168;
    }

    newRequest.currentStatus = 'UNRESOLVED';
    const query = { text: null, values: null };

    query.text = 'INSERT INTO requests (id, title, description, requested_on, address, max_hour, current_status, user_id, created_at, updated_at) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    query.values = [newRequest.title, newRequest.description, newRequest.requestedOn,
      newRequest.address, newRequest.maxHour, newRequest.currentStatus,
      newRequest.userId, newRequest.createdAt, newRequest.updatedAt,
    ];
    return new Promise(async (resolve, reject) => {
      try {
        const res = await SQL.query(query);
        resolve(new Request(res.rows[0]));
      } catch (err) {
        reject(err);
      }
    });
  }

  static async findById(id) {
    let results;
    try {
      results = await super.where('requests', 'id', '=', id);
      results = Request.resolveToRequests(results);
    } catch (err) {
      throw new Error(err);
    }

    return results[0];
  }

  static resolveToRequests(results) {
    const requests = results.rows.map(res => new Request(res));
    return requests;
  }


  save() {
    const {
      title, description, address, maxHour, currentStatus,
    } = this;
    return new Promise(async (resolve, reject) => {
      try {
        const results = await SQL.query(`UPDATE requests SET title = '${title}', description = '${description}', address = '${address}', max_hour = '${maxHour}', current_status = '${currentStatus}', updated_at = '${new Date().toISOString()}' WHERE id = ${this.id} RETURNING *`);

        const requests = results.rows.map(res => new Request(res));
        resolve(requests[0]);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default Request;
