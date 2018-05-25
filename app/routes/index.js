import express from 'express';
import { AuthController, RequestController } from '../controllers';
import Middleware from '../middlewares';


const routes = express();

routes.route('/users/requests')
  .get(RequestController.all)
  .post(Middleware.checkRequestRequired, Middleware.checkRequestValue, RequestController.create);


routes.route('/users/requests/:requestId')
  .get(Middleware.validateIntParam, Middleware.findOrFail, RequestController.show)
  .put(
    Middleware.validateIntParam, Middleware.findOrFail,
    Middleware.checkRequestValue, RequestController.update,
  );


routes.post('/auth/signup', Middleware.checkRegisterUser, AuthController.register);

// routes.post('/auth/login', AuthController.login);


export default routes;
