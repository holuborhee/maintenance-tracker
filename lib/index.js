import express from 'express';
import bodyParser from 'body-parser';
import chokidar from 'chokidar';
import RequestController from '../app/controllers/RequestController';
import Middleware from '../app/middlewares';

const app = express();

const production = process.env.NODE_ENV === 'production';

if (!production) {
  const watcher = chokidar.watch('./app');

  watcher.on('ready', () => {
    watcher.on('all', () => {
      Object.keys(require.cache).forEach((id) => {
        if (/[/\\]app[/\\]/.test(id)) {
          delete require.cache[id];
        }
      });
    });
  });
}


const port = process.env.PORT || 8082;

app.use(bodyParser.json());


/* eslint consistent-return: "off" */
app.use((req, res, next) => {
  try {
    decodeURIComponent(req.path);
    next();
  } catch (e) {
    return res.status(400).send({ status: 'error', message: 'Server cannot understand this request' });
  }
});


app.route('/api/v1/users/requests')
  .get(RequestController.all)
  .post(Middleware.checkRequestRequired, Middleware.checkRequestValue, RequestController.create);


app.route('/api/v1/users/requests/:requestId')
  .get(Middleware.validateIntParam, Middleware.findOrFail, RequestController.show)
  .put(
    Middleware.validateIntParam, Middleware.findOrFail,
    Middleware.checkRequestValue, RequestController.update,
  );

app.use((req, res) => res.status(404).send({ msg: 'This request does not match any on this server' }));


app.listen(port);

export default app;
