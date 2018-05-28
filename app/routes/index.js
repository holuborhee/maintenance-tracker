import express from 'express';
import { AuthController, RequestController } from '../controllers';
import Middleware from '../middlewares';


const routes = express();

routes.route('/users/requests')
  .get(Middleware.isAuthenticated, RequestController.all)
  .post(Middleware.isAuthenticated, Middleware.checkRequestRequired, RequestController.create);

routes.get('/requests', Middleware.isAuthenticated, Middleware.adminAuthorized, RequestController.all);

routes.route('/users/requests/:requestId')
  .get(
    Middleware.isAuthenticated, Middleware.validateIntParam, Middleware.findOrFail,
    Middleware.isAuthorized, RequestController.show,
  )
  .put(
    Middleware.validateIntParam, Middleware.findOrFail,
    Middleware.isAuthenticated, Middleware.isAuthorized, RequestController.update,
  );

routes.put(
  '/requests/:requestId/resolve', Middleware.validateIntParam, Middleware.findOrFail,
  Middleware.isAuthenticated, Middleware.adminAuthorized, RequestController.resolve,
);

routes.put(
  '/requests/:requestId/disapprove', Middleware.validateIntParam, Middleware.findOrFail,
  Middleware.isAuthenticated, Middleware.adminAuthorized, RequestController.disapprove,
);

routes.post('/auth/signup', Middleware.checkRegisterUser, AuthController.register);

routes.post('/auth/login', Middleware.checkLoginUser, AuthController.login);


export default routes;
