import validator from 'validator';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';

import { Request, User } from '../models';


class Middleware {
  /* eslint consistent-return: "off" */
  static async findRequestOrFail(req, res, next) {
    try {
      req.request = await Request.findById(req.params.requestId);
      next();
    } catch (err) {
      return res.status(404).send({ status: 'error', message: `Requested resource cannot be found on this server ${err}` });
    }
  }

  static validateIntParam(req, res, next) {
    if (validator.isInt(req.params.requestId)) {
      next();
    } else return res.status(400).send({ status: 'error', message: 'Server cannot understand this request' });
  }

  static checkNewRequest(req, res, next) {
    const validation = new Validator(req.body, {
      title: 'required|max:150',
      description: 'required',
      currentStatus: 'in:RESOLVED,REJECTED,APPROVED',
    });
    if (validation.passes()) {
      return next();
    }

    return res.status(400).send({ status: 'error', data: validation.errors });
  }

  static checkRegisterUser(req, res, next) {
    const validation = new Validator(req.body, {
      firstName: 'required|max:50|alpha',
      lastName: 'required|max:50|alpha',
      phone: 'required',
      email: 'required|email',
      password: 'required|min:6',
      address: 'required',
    });
    if (validation.passes()) {
      return next();
    }

    return res.status(400).send({ status: 'error', data: validation.errors });
  }

  static checkLoginUser(req, res, next) {
    const validation = new Validator(req.body, {
      email: 'required|email',
      password: 'required|min:6',
    });
    if (validation.passes()) {
      return next();
    }

    return res.status(400).send({ status: 'error', data: validation.errors });
  }


  static async isAuthenticated(req, res, next) {
    try {
      const token = req.headers.authorization;
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
    if (req.request.userId === req.user.id) {
      return next();
    }
    return res.status(403).send({ status: 'error', message: 'You are not authorized to peform this action' });
  }

  static isRequestModifiable(req, res, next) {
    if (req.request.currentStatus !== 'UNRESOLVED') { return res.status(422).send({ status: 'error', message: 'Modification is not allowed on an approved, rejected, or resolved request' }); }
    return next();
  }
}

export default Middleware;
