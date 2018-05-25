import chai from 'chai';
import bcrypt from 'bcrypt';
import { describe, it, after } from 'mocha';
import faker from 'faker';

import SQL from '../database/SQL';
import { Request, User } from '../models';

const { expect } = chai;

after(async () => {
  try {
    const results = await SQL.query('DELETE FROM requests; DELETE FROM users;');
    return results;
  } catch (ex) {
    return ex;
  }
});

describe.skip('Request Model', () => {
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


describe('Model User', () => {
  describe('all()', () => {
    it('should return instances of User Model', (done) => {
      User.all()
        .then((users) => {
          expect(users).to.have.lengthOf.above(5);
          done();
        });
    });
  });


  describe('create()', () => {
    it('should return an instance Of User', (done) => {
      User.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        address: `${faker.address.secondaryAddress()} ${faker.address.country()}`,
        password: `${bcrypt.hashSync('password', 10)}`,
      })
        .then((user) => {
          expect(user).to.be.an.instanceOf(User);
          done();
        });
    });

    it('should increase the users in DB', (done) => {
      User.all()
        .then((users) => {
          expect(users).to.have.lengthOf.above(5);
          done();
        });
    });
  });
});
