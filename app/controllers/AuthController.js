import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models';


/**
  * Authentication Controller
  * @class AuthController
  *
  */
class AuthController {
  /**
      * Registers a new User
      *
      * @param {object} req The request body of the request.
      * @param {object} res The response body.
     * @returns {object} res.
     */
  static async register(req, res) {
    let user;
    try {
      user = await User.create({
        firstName: validator.escape(req.body.firstName),
        lastName: validator.escape(req.body.lastName),
        phone: validator.trim(req.body.phone),
        email: validator.normalizeEmail(req.body.email),
        password: `${bcrypt.hashSync(req.body.password, 10)}`,
        address: validator.escape(req.body.address),
      });
    } catch (err) {
      res.status(500).send({ status: 'error', message: `Something went wrong while trying to register ${err}` });
    }

    delete user.password;
    return res.status(201).send({ status: 'success', data: { user } });
  }

  static async login(req, res) {
    let user;
    try {
      const users = await User.getByEmail(validator.normalizeEmail(req.body.email));
      if (users.length > 0) {
        [user] = users;
        if (!AuthController.comparePassword(req.body.password, user.password)) {
          res.status(401).send({ status: 'error', message: 'You do not have permission to login' });
        }
      }
    } catch (err) {
      res.status(500).send({ status: 'error', message: `Something went wrong while trying to login ${err}` });
    }

    delete user.password;
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '1h' });
    return res.status(200).send({ status: 'success', data: { token, user } });
  }

  static comparePassword(reqPassword, dbPassword) {
    return bcrypt.compareSync(reqPassword, dbPassword);
  }
}

export default AuthController;
