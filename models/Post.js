var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  price: Number,
});

module.exports = mongoose.model('Post', PostSchema);