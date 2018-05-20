import Request from '../models/Request';

class RequestController {
  static getAllRequests(res, req) {
    const { query } = req;
    if (!query) { res.send({ status: 'success', data: { requests: Request.findAll() } }); }
  }
}

export default RequestController;
