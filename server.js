import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import logger from 'morgan';

import api from './app/routes/api';


dotenv.config();

const app = express();

const port = process.env.PORT || 8081;

app.use(express.static(`${__dirname}/web/public`));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => res.sendFile('index.html', { root: 'web' }));
app.get('/login', (req, res) => res.sendFile('login.html', { root: 'web' }));
app.get('/register', (req, res) => res.sendFile('register.html', { root: 'web' }));
app.get('/dashboard', (req, res) => res.sendFile('allrequests.html', { root: 'web' }));
app.get('/request/:requestId', (req, res) => res.sendFile('viewRequest.html', { root: 'web' }));
app.get('/request/:requestId/edit', (req, res) => res.sendFile('editRequest.html', { root: 'web' }));
app.get('/request', (req, res) => res.sendFile('newRequest.html', { root: 'web' }));


app.use('/api/v1/docs', express.static('docs'));
app.use('/api/v1', api);


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
