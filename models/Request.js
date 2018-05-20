import db from '../db';

const { request } = db;
class Request {
  constructor(currRequest) {
    this.currId = currRequest.id;
  }
  static findAll() {
    return request;
  }

  static create() {

  }

  static findById(id) {
    const thisRequest = request.find(() => request.id === id);
    return new Request(thisRequest);
  }

  update(props) {
    const thisRequest = request.find(() => request.id === this.currId);

    Object.keys(thisRequest).forEach((key) => {
      if (key !== 'id') { thisRequest[key] = props[key]; }
    });
  }
}

export default Request;
