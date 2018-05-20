import express from 'express';
import bodyParser from 'body-parser';
import RequestController from '../controllers/RequestController';

const app = express();

const port = process.env.PORT || 8082;

// parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

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
