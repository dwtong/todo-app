var Todo = require('../app/models/todo');

function getTodo(req, res) {

  // Find todo item in database based on item id
  Todo.findById(req.params.todo_id, function (err, todo) {
    if (err) {
      res.send(err);

    } else {
      res.json(todo);
    }
  });
}

module.exports = getTodo;