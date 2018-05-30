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
      title, description, address, maxHour,
    } = req.body;
    const newRequest = {
      title, description, address, maxHour,
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
      const {
        title, description, address, maxHour,
      } = req.body;

      let { request } = req;
      request.title = title || request.title;
      request.description = description || request.description;
      request.address = address || request.address;
      request.maxHour = maxHour || request.maxHour;
      if (request.maxHour <= 24) {
        request.maxHour = 24;
      } else if (request.maxHour <= 72) {
        request.maxHour = 72;
      } else {
        request.maxHour = 168;
      }

      request = await request.save();
      return res.send({ status: 'success', data: { request } });
    } catch (err) {
      return res.status(500).send({ status: 'error', message: `Something went wrong${err}` });
    }
  }

  static async changeStatus(req, res, newStatus) {
    try {
      let { request } = req;
      request.currentStatus = newStatus;

      request = await request.save();
      return res.send({ status: 'success', data: { request } });
    } catch (err) {
      return res.status(500).send({ status: 'error', message: `Something went wrong ${err}` });
    }
  }

  static showDetails(req, res) {
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
