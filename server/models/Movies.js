const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    _id: {type: ObjectId},
    results: {type: Array},
    total_pages: {type: Number},
    total_results: {type: Number},
    ratings: {type: Array},
  }, {collection: 'movie'});
  
  
  var Movies = mongoose.model('movie', movieSchema);
  
  module.exports = Movies;