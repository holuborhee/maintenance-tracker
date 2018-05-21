import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../lib/index';
import Request from '../models/Request';

const { expect } = chai;
chai.use(chaiHttp);

describe('Routes', () => {
  describe('/users/requests', () => {
    describe('GET', () => {
      it('should return status of 200', (done) => {
        chai.request(app)
          .get('/api/v1/users/requests')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });

    describe('POST', () => {
      it('should return status of 201 for good supplied values', (done) => {
        chai.request(app)
          .post('/api/v1/users/requests')
          .send({
            title: 'This is the title', description: 'This is the description', date: '09-08-2019', address: 'this is the address', urgency: 1, status: 2, user: 1,
          })
          .end((err, res) => {
            console.log(res.body.data);
            expect(res).to.have.status(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.data.request).to.be.an('object').that.has.all.keys('id', 'title', 'description', 'date', 'address', 'urgency', 'status', 'user');
            done();
          });
      });

      it('should return status of 422 for missing required value', (done) => {
        chai.request(app)
          .post('/api/v1/users/requests')
          .send({
            date: '09-08-2019', address: 'this is the address', urgency: 'dags', status: 'sdsdsd', user: 1,
          })
          .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res.body.status).to.equal('fail');
            expect(res.body.data).to.be.an('object').that.has.all.keys('title', 'description');
            done();
          });
      });

      it('should return status of 422 for incompatible type for request body', (done) => {
        chai.request(app)
          .post('/api/v1/users/requests')
          .send({
            title: 'This is the title', description: 'This is the description', date: '09-08-2019', address: 'this is the address', urgency: 'dags', status: 'sdsdsd', user: 1,
          })
          .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res.body.status).to.equal('fail');
            expect(res.body.data).to.be.an('object').that.has.all.keys('urgency', 'status');
            done();
          });
      });
    });
  });


  describe('/users/requests/:requestId', () => {
    describe('GET', () => {
      it('should return status of 200', (done) => {
        chai.request(app)
          .get('/api/v1/users/requests/1')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(Object.keys(res.body.data.request)).to.have.lengthOf(8);
            done();
          });
      });

      it('should return status of 404', (done) => {
        chai.request(app)
          .get('/api/v1/users/requests/10')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });

      it('should return status of 400 for character param', (done) => {
        chai.request(app)
          .get('/api/v1/users/requests/a')
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });

      it('should return status of 400 for malicious param', (done) => {
        chai.request(app)
          .get('/api/v1/users/requests/%1 &%')
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
    });

    describe('PUT', () => {
      it('should return status of 200', (done) => {
        chai.request(app)
          .put('/api/v1/users/requests/2')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });
});

describe('Request Model', () => {
  describe('findAll', () => {
    it('should return all requests', (done) => {
      expect(Request.findAll()).to.be.an('array').that.has.lengthOf(5);
      done();
    });
  });

  describe('create', () => {
    let newRequest;

    it('should return a new request', (done) => {
      newRequest = Request.create({
        id: 2, title: 'Noble Computers', description: '', date: '', address: '', urgency: 1, status: 1, user: 1,
      });
      expect(newRequest.id).to.equal(6);
      done();
    });

    it('should ignore ID value in request body', (done) => {
      expect(Request.findAll()).to.be.an('array').that.has.lengthOf(6);
      done();
    });

    it('should increase length of requests array', (done) => {
      expect(newRequest.id).not.to.equal(2);
      done();
    });
  });

  let returnedRequest;
  describe('findById', () => {
    it('should return the corresponding request', (done) => {
      returnedRequest = Request.findById(1);
      expect(returnedRequest).to.be.an.instanceOf(Request);
      expect(returnedRequest.id).to.equal(1);
      done();
    });

    it('should throw an error for request not found', (done) => {
      expect(() => Request.findById(10)).to.throw();
      done();
    });
  });

  describe('update', () => {
    it('should change the value of chosen request', (done) => {
      const modified = returnedRequest.update({ title: 'I am battling with my refridgerator' });
      expect(modified.title).to.be.a('string').and.to.equal('I am battling with my refridgerator');
      done();
    });

    it('should not change the id of request', (done) => {
      const modified = returnedRequest.update({ id: 5 });
      expect(modified.id).to.be.finite.and.to.equal(1);
      done();
    });
  });
});
