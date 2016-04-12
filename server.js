// ============= SETUP =============

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Todo = require('./app/models/todo');

// Configure app to use bodyParser - used to get data from POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080;

mongoose.connect('mongodb://admin:password@ds011790.mlab.com:11790/todo');

// ============= API ROUTES =============

var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
  console.log('Something is happening.');
  next();
});

// POST new todo item, GET all todo items
router.route('/todo')

// POST - Create todo item
.post(function (req, res) {

  // Create new instance of Todo Model
  var todo = new Todo();

  // Set the todo description to the description in the request
  todo.description = req.body.description;

  // Save todo item in DB
  todo.save(function (err) {
    if (err) {
      res.send(err);
    }

    // Response contains todo object
    res.json(todo);
  });
})

// GET all todo items
.get(function (req, res) {
  Todo.find(function (err, todo) {
    if (err) {
      res.send(err);
    }

    res.json(todo);
  });
});

// GET, PUT, DELETE todo item
router.route('/todo/:todo_id')

// GET todo item
.get(function (req, res) {

  // Find todo item in database based on item id
  Todo.findById(req.params.todo_id, function (err, todo) {
    if (err) {
      res.send(err);
    }
    res.json(todo);
  });
})

// PUT - Update todo item
.put(function (req, res) {
  Todo.findById(req.params.todo_id, function (err, todo) {
    if (err) {
      res.send(err);
    }

    // Update todo description to the one in the request
    todo.description = req.body.description;

    // Save updated todo in db
    todo.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json({
        message: 'Todo updated.'
      });
    });
  });
})

.delete(function (req, res) {
  Todo.remove({
      _id: req.params.todo_id
    },
    function (err, todo) {
      if (err) {
        res.send(err);

      } else {
        res.json({
          message: 'Successfully deleted.'
        });
      }

    });
});

// Register routes, prefix with /api
app.use('/api', router);

// ============= START THE SERVER =============

app.listen(port);
console.log('Server started on port', port);