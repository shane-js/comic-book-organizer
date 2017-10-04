'use strict';
module.exports = function(app) {
  var comicBookRecords = require('../controllers/comicBookRecordController.js');

  // todoList Routes
  app.route('/comicBookRecords')
    .get(comicBookRecords.get_all_comic_book_records)
    .post(comicBookRecords.create_a_comic_book_record);


  app.route('/comicBookRecord/:comicBookRecordId')
    .put(comicBookRecords.update_a_comic_book_record)
    .delete(comicBookRecords.delete_a_comic_book_record);
};