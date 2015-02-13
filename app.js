//file used to load other routes
'use strict';
(require('rootpath')());

var express = require('express');
var app = module.exports = express();
var configs = require('config/configs');
configs.configure(app);

var staticPages = require('controllers/pages');
app.get('/', staticPages.renderIndex);
app.get('/login', staticPages.renderLogin);
app.get('/signup', staticPages.renderSignup);

var auth = require('controllers/auth');
app.post('/login', auth.localLogin);
app.get('/logout', auth.logout);
app.post('/signup', auth.localSignup);
app.get('/auth/facebook', auth.facebookAuth);
app.get('/auth/facebook/callback', auth.facebookAuthCallback);
app.get('/auth/google', auth.googleAuth);
app.get('/auth/google/callback', auth.googleAuthCallback);
app.get('/auth/twitter', auth.twitterAuth);
app.get('/auth/twitter/callback', auth.twitterAuthCallback);

app.all('*', auth.checkLoggedIn);
app.get('/profile', staticPages.renderProfile);

app.get('*', staticPages.serve404);

/**
 * handles the errors when next(err) is called
 */
var errorHandler = require('controllers/errorHandler').errorHandler;
app.use(errorHandler);

app.listen(configs.settings.secrets.port);
console.log('listening on port ' + configs.settings.secrets.port);