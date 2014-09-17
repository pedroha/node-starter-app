//file used to load other routes
'use strict';
(require('rootpath')());

var express = require('express');
var app = module.exports = express();
var configs = require('config/configs');
configs.configure(app);

var staticPages = require('./static/exports');
app.get('/', staticPages.renderIndex);
app.get('/login', staticPages.renderLogin);
app.get('/signup', staticPages.renderSignup);

var auth = require('./registry/auth');
app.post('/login', auth.localLogin);
app.post('/signup', auth.localSignup);
app.get('/auth/facebook', auth.facebookAuth);
app.get('/auth/facebook/callback', auth.facebookAuthCallback);
app.get('/auth/google', auth.googleAuth);
app.get('/auth/google/callback', auth.googleAuthCallback);
app.get('/auth/twitter', auth.twitterAuth);
app.get('/auth/twitter/callback', auth.twitterAuthCallback);

var error = require('./error/handler');
app.use(error.errorHandler);