var Todo = require('../app/models/todo');

function postTodo(req, res) {

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
}

module.exports = postTodo;