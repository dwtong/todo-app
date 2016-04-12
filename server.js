// ============= SETUP =============

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var router = express.Router();

// Configure app to use bodyParser - used to get data from POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080;

mongoose.connect('mongodb://admin:password@ds011790.mlab.com:11790/todo');

// ============= API ROUTES =============

var deleteTodo = require('./routes/deleteTodo');
var getTodo = require('./routes/getTodo');
var getAllTodos = require('./routes/getAllTodos');
var postTodo = require('./routes/postTodo');
var putTodo = require('./routes/putTodo');

// middleware to use for all requests
router.use(function (req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/todo', getAllTodos);
router.post('/todo', postTodo);

router.get('/todo/:todo_id', getTodo);
router.put('/todo/:todo_id', putTodo);
router.delete('/todo/:todo_id', deleteTodo);

// Register routes, prefix with /api
app.use('/api', router);

// ============= START THE SERVER =============

app.listen(port);
console.log('Server started on port', port);