import validator from 'validator';
import jwt from 'jsonwebtoken';

import Helper from '../Helper';
import { Request, User } from '../models';


class Middleware {
  /* eslint consistent-return: "off" */
  static async findOrFail(req, res, next) {
    try {
      req.request = await Request.findById(req.params.requestId);
      next();
    } catch (err) {
      return res.status(404).send({ status: 'error', message: `Requested resource cannot be found on this server${err}` });
    }
  }

  static validateIntParam(req, res, next) {
    if (validator.isInt(req.params.requestId)) {
      next();
    } else return res.status(400).send({ status: 'error', message: 'Server cannot understand this request' });
  }

  static checkRequestRequired(req, res, next) {
    const required = ['title', 'description'];
    const allInRequest = Helper.validateRequiredInRequest(req.body, required);
    if (allInRequest === true) {
      next();
    } else {
      return res.status(400).send(allInRequest);
    }
  }

  static checkRegisterUser(req, res, next) {
    const required = ['firstName', 'lastName', 'phone', 'email', 'password', 'address'];
    const allInRequest = Helper.validateRequiredInRequest(req.body, required);
    if (allInRequest === true) {
      const data = Middleware.checkUserValue(req.body);
      if (data === true) { return next(); } return res.status(422).send({ status: 'fail', data });
    }
    return res.status(400).send(allInRequest);
  }

  static checkLoginUser(req, res, next) {
    const required = ['email', 'password'];
    const allInRequest = Helper.validateRequiredInRequest(req.body, required);
    if (allInRequest === true) { return next(); }
    return res.status(400).send(allInRequest);
  }

  static checkRequestValue(req, res, next) {
    if (Object.keys(req.body).length === 0) { return res.status(400).send({ status: 'error', message: 'Server cannot understand this request' }); }
    try {
      req.user = User.findById(req.body.user);
    } catch (err) {
      return res.status(422).send({ status: 'fail', data: { user: 'This user cannot be found on the server' } });
    }
    const data = Helper.validateClassProperties('Request', req.body);
    if (data === true) { next(); } else { return res.status(422).send({ status: 'fail', data }); }
  }

  static checkUserValue(body) {
    const data = Helper.validateClassProperties('User', body);
    return data;
  }

  static async isAuthenticated(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      return res.status(401).send({ status: 'error', message: 'You are not authenticated' });
    }
  }

  static async adminAuthorized(req, res, next) {
    if (req.user.isAdmin) {
      return next();
    }
    return res.status(401).send({ status: 'error', message: 'You are not authorized to perform this action' });
  }

  static async isAuthorized(req, res, next) {
    if (req.user.isAdmin) {
      return next();
    }
    try {
      const request = await Request.findById(req.params.requestId);
      if (request.userId === req.user.id) {
        return next();
      }
    } catch (ex) {
      return res.status(500).send({ status: 'error', message: 'There was an internal server error' });
    }

    return res.status(403).send({ status: 'error', message: 'You are not authorized to peform this action' });
  }
}

export default Middleware;
