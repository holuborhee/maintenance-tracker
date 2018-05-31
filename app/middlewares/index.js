import validator from 'validator';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';

import { Request, User } from '../models';


Validator.registerAsync('email_available', (email, attribute, req, passes) => User.getByEmail(email)
  .then((res) => {
    if (res.length > 0) passes(false, 'Email already exists.'); // if email exists
    else { passes(); } // if email doesn't exist
  })
  .catch((err) => {
    throw new Error(err);
  }));

Validator.registerAsync('can_status_change', (status, attribute, req, passes) => {
  switch (req.request.currentStatus) {
    case 'REJECTED':
      if (status !== 'APPROVED') { passes(false, 'Cannot RESOLVE a rejected request'); } else { passes(); }
      break;
    case 'RESOLVED':
      passes(false, 'Request already approved');
      break;
    case 'APPROVED':
      passes();
      break;
    default:
      passes(false, 'Not a valid status');
  }
});

class Middleware {
  /* eslint consistent-return: "off" */
  static async findRequestOrFail(req, res, next) {
    try {
      req.request = await Request.findById(req.params.requestId);
      next();
    } catch (err) {
      return res.status(404).send({ status: 'error', message: `This request does not exist: ${err}` });
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
      description: 'required|min:30',
    });
    if (validation.passes()) {
      return next();
    }

    return res.status(400).send({ status: 'fail', data: validation.errors });
  }

  static validateChangeStatus(req, res, next) {
    const validation = new Validator(req.body, {
      currentStatus: 'in:RESOLVED,REJECTED,APPROVED|can_status_change',
    });

    validation.passes(() => next());
    validation.fails(() => res.status(400).send({ status: 'fail', data: validation.errors }));
  }

  static checkRegisterUser(req, res, next) {
    req.body.email = validator.normalizeEmail(req.body.email);
    const validation = new Validator(req.body, {
      firstName: 'required|min:2|max:50|alpha',
      lastName: 'required|min:2|max:50|alpha',
      phone: 'required|regex:/^\\+?[0-9]{11,14}$/',
      email: 'required|email|email_available',
      password: 'required|min:6',
      address: 'required',
    });
    validation.passes(() => next());
    validation.fails(() => {
      if (validation.errors.errorCount === 1 && validation.errors.get('email').includes('Email already exists.')) { return res.status(409).send({ status: 'fail', data: validation.errors }); }
      return res.status(400).send({ status: 'fail', data: validation.errors });
    });
  }


  static checkLoginUser(req, res, next) {
    req.body.email = validator.normalizeEmail(req.body.email);
    const validation = new Validator(req.body, {
      email: 'required|email',
      password: 'required|min:6',
    });
    if (validation.passes()) {
      return next();
    }

    return res.status(400).send({ status: 'fail', data: validation.errors });
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
