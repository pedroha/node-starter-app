'use strict';
(require('rootpath')());

var configs = require('config/configs');
var passport = configs.passport;

exports.facebookAuth = passport.authenticate('facebook', { scope: 'email' });
exports.facebookAuthCallback = passport.authenticate('facebook', { 
  successRedirect: '/',
  failureRedirect: '/' 
});

exports.googleAuth = passport.authenticate('google');
exports.googleAuthCallback = passport.authenticate('google', { 
  successRedirect: '/',
  failureRedirect: '/' 
});

exports.twitterAuth = passport.authenticate('twitter');
exports.twitterAuthCallback = passport.authenticate('twitter', { 
  successRedirect: '/',
  failureRedirect: '/' 
});

exports.localSignup = passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
});

exports.localLogin = passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
});