var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var helmet = require('helmet');

app = express();
app.use(helmet());
app.use(serveStatic(__dirname, { index: 'index.html' }));
//app.use(serveStatic(__dirname + "/dist"));

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started ' + port);