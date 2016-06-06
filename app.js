var express = require('express'),
  app = express(),
  bodyParser = require('body-parser')
  path = require('path');

  var routes = require('./routes');

  var fsmonitor = require('fsmonitor');


  app.set('view engine', 'ejs');
  //app.set('views',path.join(__dirname, 'views')); //
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser());
  app.use(bodyParser.urlencoded({extended: false}));



  app.get('/', routes);
  app.post('/', routes);
  app.get('/home',routes);
  app.post('/viosListp',routes);
  app.post('/form', routes);
  app.post('/form2', routes);
  app.get('/history',routes);
 app.post('/historyp',routes);
 app.post('/clusterForm', routes);
 app.post('/clusterForm2', routes);
 app.post('/clusterdata', routes);
 app.post('/clusterCreate', routes);


  var server = app.listen(8080, function() {
    console.log("Server started");

  });
 // console.log("Watching SSP_Logs Folder");
 //  fsmonitor.watch('./SSP_Logs', null, function(change) {
 //      console.log("Change detected in SSP Logs folder:\n" + change);
 //      });

/// added login.ejs in views

/// changed render in index.js

// take backup of current front_SSP

// Logs folder are in coming correctly
