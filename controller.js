var Todo = require('./app/models/todo');

exports.deleteTodo = function (req, res) {
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
};

exports.getTodo = function (req, res) {

  // Find todo item in database based on item id
  Todo.findById(req.params.todo_id, function (err, todo) {
    if (err) {
      res.send(err);

    } else {
      res.json(todo);
    }
  });
}

exports.getAllTodos = function (req, res) {
  Todo.find(function (err, todo) {
    if (err) {
      res.send(err);
    }

    res.json(todo);
  });
};

exports.putTodo = function (req, res) {
  Todo.findById(req.params.todo_id, function (err, todo) {
    if (err) {
      res.send(err);
    }

    // Update todo description to the one in the request
    todo.description = req.body.description;

    // Save updated todo in Todo
    todo.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json({
        message: 'Todo updated.'
      });
    });
  });
};

exports.postTodo = function (req, res) {

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
};