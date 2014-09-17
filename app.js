'use strict';
(require('rootpath')());

var express = require('express');
var app = module.exports = express();
var configs = require('config/configs');

app.use('/', require('controllers/routes'));
app.listen(configs.settings.secrets.port);
console.log('listening on port ' + configs.settings.secrets.port);