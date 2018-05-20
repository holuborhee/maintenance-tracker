import db from '../db';

const { requests } = db;
class Request {
  constructor(currRequest) {
    this.id = currRequest.id;
  }
  static findAll() {
    return requests;
  }

  static create() {

  }

  static findById(id) {
    const thisRequest = requests.find(request => request.id === id);
    return new Request(thisRequest);
  }

  update(props) {
    const thisRequest = requests.find(request => request.id === this.id);

    Object.keys(thisRequest).forEach((key) => {
      if (key !== 'id') { thisRequest[key] = props[key]; }
    });

    return thisRequest;
  }
}

export default Request;
