import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../lib/index.js';


const { expect } = chai;
chai.use(chaiHttp);

describe('Routes', () =>  {
  describe('/users/requests', () => {
  	describe('GET', () => {
  	  it('should return return status of 200', (done) => {
  	    chai.request(app)
  	      .get('/users/requests')
  	      .end((err, res) => {
  	      	expect(res).to.have.status(200);
  	      	done();
  	      })
  	  });
  	})

  	describe('POST', () => {
  	  it('should return return status of 200', (done) => {
  	    chai.request(app)
  	      .post('/users/requests')
  	      .end((err, res) => {
  	      	expect(res).to.have.status(201);
  	      	done();
  	      })
  	  });
  	})
    
  });


  describe('/users/requests/:requestId', () => {
  	describe('GET', () => {
  	  it('should return return status of 200', (done) => {
  	    chai.request(app)
  	      .get('/users/requests/1')
  	      .end((err, res) => {
  	      	expect(res).to.have.status(200);
  	      	done();
  	      })
  	  });
  	})

  	describe('PUT', () => {
  	  it('should return return status of 200', (done) => {
  	    chai.request(app)
  	      .put('/users/requests/2')
  	      .end((err, res) => {
  	      	expect(res).to.have.status(200);
  	      	done();
  	      })
  	  });
  	})
    
  });

});