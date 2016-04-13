process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../server');
var Todo = require('../app/models/todo');

var should = chai.should();
chai.use(chaiHttp);

var todoUrl = '/api/todo';



describe('API for Todos', function () {

  Todo.collection.drop();

  beforeEach(function (done) {
    var newTodo = new Todo({
      description: 'testTodo'
    });

    newTodo.save(function (err) {
      done();
    });
  });

  afterEach(function (done) {
    Todo.collection.drop();
    done();
  });

  it('should list all todos on /todo GET', function (done) {
    chai.request(server)
      .get(todoUrl)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });

  it('should list a single todo on /todo/<id> GET', function (done) {
    var newTodo = new Todo({
      description: 'Get Todo Plz'
    });
    newTodo.save(function (err, data) {
      chai.request(server)
        .get(todoUrl + '/' + data.id)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('description');
          res.body.description.should.equal('Get Todo Plz');
          done();
        });
    });
  });

  it('should add a todo on /todo POST', function (done) {
    chai.request(server)
      .post(todoUrl)
      .send({
        'description': 'test-todo'
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('description');
        res.body.description.should.equal('test-todo');
        done();
      });
  });

  it('should update a todo on /todo/<id> PUT', function (done) {
    chai.request(server)
      .get(todoUrl)
      .end(function (err, res) {
        chai.request(server)
          .put(todoUrl + '/' + res.body[0]._id)
          .send({
            'description': 'updated todo'
          })
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('description');
            res.body.description.should.equal('updated todo');
            done();
          });
      });
  });

  it('should delete a todo on /todo/<id> DELETE', function (done) {
    chai.request(server)
      .get(todoUrl)
      .end(function (err, res) {
        chai.request(server)
          .delete(todoUrl + '/' + res.body[0]._id)
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Successfully deleted.');
            done();
          });
      });
  });

});