import Request from '../models/Request';

class RequestController {
  static all(req, res) {
    return res.send({ status: 'success', data: { requests: Request.findAll() } });
  }

  static create(req, res) {
    const requests = Request.create(req.body);
    return res.status(201).send({ status: 'success', data: { requests } });
  }

  static update(req, res) {
    let request = Request.findById(req.params.requestId);
    request = request.update(req.body);
    res.send({ status: 'success', data: { request } });
  }

  static show(req, res) {
    return res.send({ status: 'success', data: { request: Request.findOne(req.params.requestId) } });
  }
}

export default RequestController;
