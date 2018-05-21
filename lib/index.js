import express from 'express';
import bodyParser from 'body-parser';
import chokidar from 'chokidar';
import RequestController from '../app/controllers/RequestController';

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

app.use(bodyParser.urlencoded({ extended: true }));


app.route('/api/v1/users/requests')
  .get(RequestController.all)
  .post(RequestController.create);


app.route('/api/v1/users/requests/:requestId')
  .get(RequestController.show)
  .put(RequestController.update);

app.use((req, res) => {
  res.status(404).send({ msg: 'This request does not match any on this server' });
});


app.listen(port);

export default app;
