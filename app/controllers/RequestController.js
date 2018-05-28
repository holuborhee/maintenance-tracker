import Request from '../models/Request';

class RequestController {
  static async all(req, res) {
    if (req.user.isAdmin) {
      try {
        const requests = await Request.all();
        res.send({ status: 'success', data: { requests } });
      } catch (ex) {
        res.send(500).status({ status: 'fail', message: 'something went wrong' });
      }
    } else {
      RequestController.getRequestForUser(req.user)
        .then(requests => res.send({ status: 'success', data: { requests } })).catch(ex => res.send({ status: 'error', message: ex }));
    }
  }

  static async create(req, res) {
    const {
      title, description, address, requestUrgency,
    } = req.body;
    const newRequest = {
      title, description, address, requestUrgency,
    };
    newRequest.userId = req.user.id;
    newRequest.address = address || req.user.address;
    let request;
    try {
      request = await Request.create(newRequest);
    } catch (ex) {
      return res.status(500).send({ status: 'error', message: `Something went wrong${ex}` });
    }
    return res.status(201).send({ status: 'success', data: { request } });
  }

  static async update(req, res) {
    try {
      const request = Request.update(req.body);
      return res.send({ status: 'success', data: { request } });
    } catch (err) {
      return res.status(500).send({ status: 'error', message: `Something went wrong${err}` });
    }
  }

  static async resolve(req, res) {
    let request;
    try {
      request = await req.request.resolveMe();
    } catch (err) {
      return res.status(500).send({ status: 'error', message: `Something went wrong${err}` });
    }

    return res.status(200).send({ status: 'success', data: { request } });
  }

  static async disapprove(req, res) {
    let request;
    try {
      request = await req.request.rejectMe();
    } catch (err) {
      return res.status(500).send({ status: 'error', message: `Something went wrong${err}` });
    }

    return res.status(200).send({ status: 'success', data: { request } });
  }

  static show(req, res) {
    return res.send({ status: 'success', data: { request: req.request } });
  }

  static async getRequestForUser(user) {
    try {
      const requests = await user.getMyRequests();
      return requests;
    } catch (err) {
      return { error: true, err };
    }
  }
}

export default RequestController;
