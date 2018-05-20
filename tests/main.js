import chai from 'chai';
import chaiHttp from 'chai-http';

const { expect } = chai;
chai.use(chaiHttp);
var assert = require('assert');

describe('Routes', function() {
  describe('GET /users/requests', function() {
    it('should return return status of 400');
  });

  describe('POST /users/requests', function() {
    it('should return return status of 201');
  });

  describe('GET /users/requests/1', function() {
    it('should return return status of 200');
  });

  describe('PUT /users/requests', function() {
    it('should return return status of 200');
  });
});