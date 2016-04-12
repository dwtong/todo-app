var Todo = require('../app/models/todo');

function getAllTodos(req, res) {
  Todo.find(function (err, todo) {
    if (err) {
      res.send(err);
    }

    res.json(todo);
  });
}

module.exports = getAllTodos;