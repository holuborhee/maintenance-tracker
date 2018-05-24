import validator from 'validator';

import Helper from '../lib/Helper';
import Request from '../models/Request';
import { User } from '../models';


class Middleware {
  /* eslint consistent-return: "off" */
  static findOrFail(req, res, next) {
    try {
      req.request = Request.findById(req.params.requestId);
      next();
    } catch (err) {
      return res.status(404).send({ status: 'error', message: 'Requested resource cannot be found on this server' });
    }
  }

  static validateIntParam(req, res, next) {
    if (validator.isInt(req.params.requestId)) {
      next();
    } else return res.status(400).send({ status: 'error', message: 'Server cannot understand this request' });
  }

  static checkRequestRequired(req, res, next) {
    const required = ['title', 'description', 'date', 'address', 'urgency', 'status', 'user'];
    const allInRequest = Helper.validateRequiredInRequest(req.body, required);
    if (allInRequest === true) {
      next();
    } else {
      return res.status(422).send(allInRequest);
    }
  }

  static checkRequestValue(req, res, next) {
    if (Object.keys(req.body).length === 0) { return res.status(422).send({ status: 'error', message: 'Server cannot understand this request' }); }
    try {
      req.user = User.findById(req.body.user);
    } catch (err) {
      return res.status(422).send({ status: 'fail', data: { user: 'This user cannot be found on the server' } });
    }
    const data = Helper.validateClassProperties('Request', req.body);
    if (data === true) { next(); } else { return res.status(422).send({ status: 'fail', data }); }
  }
}

export default Middleware;
