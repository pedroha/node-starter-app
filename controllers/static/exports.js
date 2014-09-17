'use strict';

exports.renderIndex = function(req, res) {
  res.render('index');
}

exports.renderLogin = function(req, res) {
  res.render('login', {error: ''});
}

exports.renderSignup = function(req, res) {
  res.render('signup', {error: ''});
}
