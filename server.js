var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var ComicBookRecord = require('./api/models/comicBookRecordModel'); //created model loading here
var bodyParser = require('body-parser');
var serverConfig = require('./serverConfig.js');
  
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(serverConfig.mongoConnectionString,  { useMongoClient: true}); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var routes = require('./api/routes/comicBookRecordRoutes'); //importing route
routes(app); //register the route

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});


app.listen(process.env.PORT || 3000);