const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');

var serieSchema = new mongoose.Schema({
    _id: {type: ObjectId},
    results: {type: Array},
    total_pages: {type: Number},
    total_results: {type: Number},
  }, {collection: 'series'});
  
  
  var Series = mongoose.model('series', serieSchema);
  
  module.exports = Series;