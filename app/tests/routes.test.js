import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../server';


const { expect } = chai;
chai.use(chaiHttp);


describe('api/v1/auth/signup', () => {
  describe('POST', () => {
    it('should return status of 201 for good supplied values', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'John',
          lastName: 'David',
          phone: '+2348164488989',
          email: 'daveholuee@gmail.com',
          password: 'password',
          address: 'any addrress',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.data.user).to.be.an('object').that.has.all.keys('id', 'firstName', 'lastName', 'phone', 'email', 'address', 'createdAt', 'updatedAt');
          done();
        });
    });

    it('should not have password');
    it('should return 400');
    it('should return 422');
  });
});

describe.skip('Routes', () => {
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

      it('should return 422 for user not found', (done) => {
        chai.request(app)
          .post('/api/v1/users/requests')
          .send({
            title: 'This is the title', description: 'This is the description', date: '09-08-2019', address: 'this is the address', urgency: 'dags', status: 'sdsdsd', user: 100,
          })
          .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res.body.status).to.equal('fail');
            expect(res.body.data).to.be.an('object').that.has.all.keys('user');
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
      it('should return status of 422', (done) => {
        chai.request(app)
          .put('/api/v1/users/requests/2')
          .end((err, res) => {
            expect(res).to.have.status(422);
            done();
          });
      });

      it('should return status of 200', (done) => {
        chai.request(app)
          .put('/api/v1/users/requests/2')
          .send({
            title: 'This is a new Title', user: 1,
          })
          .end((err, res) => {
            expect(res.body.data.request.title).to.equal('This is a new Title');
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });
});
