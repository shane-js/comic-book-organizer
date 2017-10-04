'use strict';


var mongoose = require('mongoose'),
  ComicBookRecord = mongoose.model('ComicBookRecords');

exports.get_all_comic_book_records = function(req, res) {
  ComicBookRecord.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_comic_book_record = function(req, res) {
  var newComicBookRecord = new ComicBookRecord(req.body);
  newComicBookRecord.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_comic_book_record = function(req, res) {
  ComicBookRecord.findOneAndUpdate({_id: req.params.comicBookRecordId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_comic_book_record = function(req, res) {
  ComicBookRecord.remove({
    _id: req.params.comicBookRecordId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Comic Book Record successfully deleted' });
  });
};


