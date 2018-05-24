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
        name: req.body.name, phone: req.body.phone.trim(), email: req.body.email.trim().toLowerCase(), password: `${bcrypt.hashSync(req.body.password, 10)}`,
      });
    } catch (err) {
      res.status(500).send({ status: 'error', message: err });
    }

    const {
      id, name, phone, email,
    } = user;
    return res.status(201).send({
      status: 'success',
      data: {
        user: {
          id, name, phone, email,
        },
      },
    });
  }
}

export default AuthController;
