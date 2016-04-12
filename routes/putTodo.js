var Todo = require('../app/models/todo');

function putTodo(req, res) {
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
}

module.exports = putTodo;