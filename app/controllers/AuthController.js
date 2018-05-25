import validator from 'validator';
import bcrypt from 'bcrypt';
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
}

export default AuthController;
