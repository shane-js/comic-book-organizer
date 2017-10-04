'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ComicBookRecordSchema = new Schema({
  comicBookName: {
    type: String,
    required: 'Comic Book Name is required'
  },
  publisherName: {
    type: String,
    required: 'Publisher Name is required'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  volume: {
    type: Number,
    required: 'Volume Number is required'
  },
  issue: {
    type: Number,
    required: 'Issue Number is required'
  }
    
});

module.exports = mongoose.model('ComicBookRecords', ComicBookRecordSchema);