import db from '../db';

const { requests } = db;
class Request {
  constructor(currRequest) {
    this.id = currRequest.id;
  }
  static findAll() {
    return requests;
  }

  static create(properties) {
    const {
      title, description, date, address, urgency, status, user,
    } = properties;

    const newRequest = {
      id: null,
      title,
      description,
      date,
      address,
      urgency,
      status,
      user,
    };

    newRequest.id = requests.length + 1;

    requests.push(newRequest);

    return newRequest;
  }

  static findById(id) {
    const thisRequest = requests.find(request => request.id === id);
    return new Request(thisRequest);
  }

  update(properties) {
    const thisRequest = requests.find(request => request.id === this.id);

    Object.keys(thisRequest).forEach((key) => {
      if (key !== 'id') { thisRequest[key] = properties[key]; }
    });

    return thisRequest;
  }
}

export default Request;
