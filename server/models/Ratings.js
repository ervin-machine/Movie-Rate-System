const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
    _id: {type: ObjectId},
    title: {type: String},
    rate: { type: Number},
  }, {collection: 'ratings'});
  
  
  var Ratings = mongoose.model('ratings', ratingSchema);
  
  module.exports = Ratings;