import express from 'express';

const app = express();

app.route('/users/requests')
  .get((req, res) => res.send({ msg: 'I give all requests for user' }))
  .post((req, res) => res.status(201).send({ msg: 'I create a new request' }));


app.route('/users/requests/:requestId')
  .get((req, res) => res.send({ msg: 'I give full detail about this request' }))
  .put((req, res) => res.send({ msg: 'I modify this request' }));

app.use((req, res) => {
  res.status(404).send({ msg: 'This request does not match any on this server' });
});


app.listen(3002);

export default app;
