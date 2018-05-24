import express from 'express';
import bodyParser from 'body-parser';
import chokidar from 'chokidar';
import dotenv from 'dotenv';

import routes from './app/routes/index';


dotenv.config();

console.log(process.env);
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

const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use('/api/v1', routes);


app.use((req, res, next) => {
  try {
    decodeURIComponent(req.path);
    return next();
  } catch (e) {
    return res.status(400).send({ status: 'error', message: 'Server cannot understand this request' });
  }
});


app.use((req, res) => res.status(404).send({ msg: 'This request does not match any on this server' }));


app.listen(port);

export default app;
