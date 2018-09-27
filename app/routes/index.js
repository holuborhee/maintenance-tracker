import express from 'express';
import { AuthController, RequestController } from '../controllers';
import Middleware from '../middlewares';


const routes = express();

routes.route('/questions')
  .get((req, res) => {
    res.status(200).send({
      status: 'success',
      data: [
        'I am constantly curious and I attend to my personal growth and development and I pursue continous improvement',
        'I am resilient, dilligent, resourceful, consistent, determined and persevering',
        'I am passionate about what I do',
        'I am accountable and I take responsibility',
        'I am collaborative, I work well with teeam members',
      ],
    });
  });

routes.route('/users/requests')
  .get(Middleware.isAuthenticated, RequestController.all)
  .post(Middleware.isAuthenticated, Middleware.checkNewRequest, RequestController.create);

routes.get('/requests', Middleware.isAuthenticated, Middleware.adminAuthorized, RequestController.all);

routes.route('/users/requests/:requestId')
  .get(
    Middleware.isAuthenticated, Middleware.validateIntParam, Middleware.findRequestOrFail,
    Middleware.isAuthorized, RequestController.showDetails,
  )
  .put(
    Middleware.validateIntParam, Middleware.findRequestOrFail,
    Middleware.isAuthenticated, Middleware.isAuthorized,
    Middleware.isRequestModifiable, RequestController.update,
  );

routes.put(
  '/requests/:requestId/resolve', Middleware.validateIntParam, Middleware.findRequestOrFail,
  Middleware.isAuthenticated, Middleware.adminAuthorized, (req, res) => RequestController.changeStatus(req, res, 'RESOLVED'),
);
routes.put(
  '/requests/:requestId/approve', Middleware.validateIntParam, Middleware.findRequestOrFail,
  Middleware.isAuthenticated, Middleware.adminAuthorized, (req, res) => RequestController.changeStatus(req, res, 'APPROVED'),
);
routes.put(
  '/requests/:requestId/disapprove', Middleware.validateIntParam, Middleware.findRequestOrFail,
  Middleware.isAuthenticated, Middleware.adminAuthorized, (req, res) => RequestController.changeStatus(req, res, 'REJECTED'),
);

routes.post('/auth/signup', Middleware.checkRegisterUser, AuthController.register);

routes.post('/auth/login', Middleware.checkLoginUser, AuthController.login);


export default routes;
