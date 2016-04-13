// ============= SETUP =============

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var router = express.Router();
var Todo = require('./app/models/todo');
var controller = require('./controller')(Todo);

// Configure app to use bodyParser - used to get data from POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080;

mongoose.connect('mongodb://admin:password@ds011790.mlab.com:11790/todo');

// ============= API ROUTES =============

// middleware to use for all requests
router.use(function (req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/todo', controller.getAllTodos);
router.post('/todo', controller.postTodo);

router.get('/todo/:todo_id', controller.getTodo);
router.put('/todo/:todo_id', controller.putTodo);
router.delete('/todo/:todo_id', controller.deleteTodo);

// Register routes, prefix with /api
app.use('/api', router);

// ============= START THE SERVER =============

app.listen(port);
console.log('Server started on port', port);