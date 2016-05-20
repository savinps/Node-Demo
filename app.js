var express = require('express'),
  app = express(),
  bodyParser = require('body-parser')
  path = require('path');

  var routes = require('./routes');


  app.set('view engine', 'ejs');
  //app.set('views',path.join(__dirname, 'views')); //
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser());
  app.use(bodyParser.urlencoded({extended: false}));



  app.get('/', routes);
  app.post('/viosListp',routes);
  app.post('/form', routes);
  app.post('/form2', routes);
  app.get('/history',routes);
 app.post('/historyp',routes);
 app.post('/clusterForm', routes);
 app.post('/clusterForm2', routes);
 app.post('/clusterdata', routes);
 app.post('/clusterCreate', routes);

  var server = app.listen(80, function() {
    console.log("Server started");

  });

/// added login.ejs in views

/// changed render in index.js

// take backup of current front_SSP

// Logs folder are in coming correctly
