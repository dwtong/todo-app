module.exports = function (Db) {

  var deleteTodo = function (req, res) {
    Db.remove({
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

  var getTodo = function (req, res) {

    // Find todo item in database based on item id
    Db.findById(req.params.todo_id, function (err, todo) {
      if (err) {
        res.send(err);

      } else {
        res.json(todo);
      }
    });
  }

  var getAllTodos = function (req, res) {
    Db.find(function (err, todo) {
      if (err) {
        res.send(err);
      }

      res.json(todo);
    });
  };

  var putTodo = function (req, res) {
    Db.findById(req.params.todo_id, function (err, todo) {
      if (err) {
        res.send(err);
      }

      // Update todo description to the one in the request
      todo.description = req.body.description;

      // Save updated todo in Db
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

  var postTodo = function (req, res) {

    // Create new instance of Todo Model
    var todo = new Db();

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

  return {
    deleteTodo: deleteTodo,
    getTodo: getTodo,
    getAllTodos: getAllTodos,
    postTodo: postTodo,
    putTodo: putTodo
  }
};