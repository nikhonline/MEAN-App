/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../employee');
var should = chai.should();
chai.use(chaiHttp);

describe('employees', function() {
  it('should return JSON on /emplyees GET');
  it('should return 200 HTTP code on /emplyees GET');
});

describe('employee', function() {
  it('should return JSON on /emplyees GET');
});
// Functions which will be available to external callers
// 
 it('should return JSON', function(done) {
  chai.request(server)
    .get('/employees')
    .end(function(err, res){
      res.should.be.json;
      done();
    });
});
it('should return 200 HTTP code', function(done) {
  chai.request(server)
    .get('/employees')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});

 it('should return JSON', function(done) {
  chai.request(server)
    .get('/employee')
    .end(function(err, res){
      res.should.be.json;
      res.should.have.status(200);
      done();
    });
});
// exports.doSomething = doSomething;
