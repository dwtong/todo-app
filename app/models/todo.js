var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  description: String
});

module.exports = mongoose.model('Todo', TodoSchema);