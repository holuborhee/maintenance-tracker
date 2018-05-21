import Request from '../models/Request';

class RequestController {
  static all(req, res) {
    return res.send({ status: 'success', data: { requests: Request.findAll() } });
  }

  static create(req, res) {
    const request = Request.create(req.body);
    return res.status(201).send({ status: 'success', data: { request } });
  }

  static update(req, res) {
    let { request } = req;
    request = request.update(req.body);
    res.send({ status: 'success', data: { request } });
  }

  static show(req, res) {
    return res.send({ status: 'success', data: { request: req.request } });
  }
}

export default RequestController;
