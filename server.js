// ============= SETUP =============

var bodyParser = require('body-parser');
var config = require('./_config');
var express = require('express');
var controller = require('./controller');
var mongoose = require('mongoose');
var Todo = require('./app/models/todo');

var app = express();
var router = express.Router();

// Configure app to use bodyParser - used to get data from POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080;

mongoose.connect(config.mongoURI[app.settings.env], function (err, res) {
  if (err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to database: ' + config.mongoURI[app.settings.env]);
  }
});

// ============= API ROUTES =============

router.get('/todo', controller.getAllTodos);
router.post('/todo', controller.postTodo);

router.get('/todo/:todo_id', controller.getTodo);
router.put('/todo/:todo_id', controller.putTodo);
router.delete('/todo/:todo_id', controller.deleteTodo);

// Register routes, prefix with /api
app.use('/api', router);

// ============= START THE SERVER =============

var server = app.listen(port);
console.log('Server started on port', port);

module.exports = server;