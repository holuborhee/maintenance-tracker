import SQL from '../database/SQL';


class Request {
  constructor(currRequest) {
    this.id = currRequest.id;
    this.title = currRequest.title;
    this.description = currRequest.description;
    this.requested_on = currRequest.requested_on;
    this.address = currRequest.address;
    this.urgency = currRequest.request_urgency;
    this.currentStatus = currRequest.current_status;
    this.userId = currRequest.user_id;
    this.createdAt = currRequest.created_at;
    this.updatedAt = currRequest.updated_at;
  }

  static all() {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await SQL.query('SELECT * FROM requests');
        const requests = results.rows.map(res => new Request(res));
        resolve(requests);
      } catch (err) {
        reject(err);
      }
    });
  }

  static create(properties) {
    const newRequest = properties;

    newRequest.requestedOn = new Date().toISOString();
    newRequest.createdAt = new Date().toISOString();
    newRequest.updatedAt = new Date().toISOString();

    newRequest.requestUrgency = newRequest.requestUrgency <= 24 ? newRequest.requestUrgency : 72;
    newRequest.requestUrgency = newRequest.requestUrgency <= 72 ? newRequest.requestUrgency : 168;

    newRequest.currentStatus = 'UNRESOLVED';
    const query = { text: null, values: null };

    query.text = 'INSERT INTO requests (id, title, description, requested_on, address, request_urgency, current_status, user_id, created_at, updated_at) VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    query.values = [newRequest.title, newRequest.description, newRequest.requestedOn,
      newRequest.address, newRequest.requestUrgency, newRequest.currentStatus,
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

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await SQL.query(`SELECT * FROM requests WHERE id = ${id}`);
        const requests = results.rows.map(res => new Request(res));
        resolve(requests[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  resolveMe() {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await SQL.query(`UPDATE requests SET current_status = 'RESOLVED' WHERE id = ${this.id} RETURNING *`);

        const requests = results.rows.map(res => new Request(res));
        resolve(requests[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  rejectMe() {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await SQL.query(`UPDATE requests SET current_status = 'REJECTED' WHERE id = ${this.id} RETURNING *`);

        const requests = results.rows.map(res => new Request(res));
        resolve(requests[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  /* update(properties) {
     const thisRequest = requests.find(request => request.id === this.id);

    Object.keys(thisRequest).forEach((key) => {
      if (key !== 'id') { thisRequest[key] = properties[key]; }
    });

    return thisRequest;
  } */
}

export default Request;
