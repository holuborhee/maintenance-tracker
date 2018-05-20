import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../lib/index';
import Request from '../models/Request';

const { expect } = chai;
chai.use(chaiHttp);

describe('Routes', () => {
  describe('/users/requests', () => {
    describe('GET', () => {
      it('should return return status of 200', (done) => {
        chai.request(app)
          .get('/users/requests')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });

    describe('POST', () => {
      it('should return return status of 200', (done) => {
        chai.request(app)
          .post('/users/requests')
          .end((err, res) => {
            expect(res).to.have.status(201);
            done();
          });
      });
    });
  });


  describe('/users/requests/:requestId', () => {
    describe('GET', () => {
      it('should return return status of 200', (done) => {
        chai.request(app)
          .get('/users/requests/1')
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });

    describe('PUT', () => {
      it('should return return status of 200', (done) => {
        chai.request(app)
          .put('/users/requests/2')
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
      expect(Request.findAll()).to.be.an('array').that.has.lengthOf(4);
      done();
    });
  });

  describe('create', () => {
    let newRequest;

    it('should return a new request', (done) => {
      newRequest = Request.create({
        id: 2, title: 'Noble Computers', description: '', date: '', address: '', urgency: 1, status: 1, user: 1,
      });
      expect(newRequest.id).to.equal(5);
      done();
    });

    it('should increase length of requests array', (done) => {
      expect(Request.findAll()).to.be.an('array').that.has.lengthOf(5);
      done();
    });
  });

  const returnedRequest = Request.findById(1);
  describe('findById', () => {
    it('should return the corresponding request', (done) => {
      expect(returnedRequest).to.be.an.instanceOf(Request);
      expect(returnedRequest.id).to.equal(1);
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
