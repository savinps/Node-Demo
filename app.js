var express = require('express'),
  app = express(),
  bodyParser = require('body-parser')
  path = require('path');

  var routes = require('./routes');


  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser());
  app.use(bodyParser.urlencoded({extended: false}));



  app.get('/', routes);
  app.post('/viosListp',routes);
  app.post('/form', routes);
  app.get('/history',routes);
 app.post('/historyp',routes);
 app.post('/clusterForm', routes);
  var server = app.listen(80, function() {
    console.log("Server started");

  });
