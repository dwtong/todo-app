var Todo = require('../app/models/todo');

function deleteTodo(req, res) {
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
}

module.exports = deleteTodo;