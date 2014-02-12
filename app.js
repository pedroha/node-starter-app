var express = require("express");
var app = express();
var nodemailer = require('nodemailer');
var MemoryStore = require('connect').session.MemoryStore;

// Data layer
var mongoose = require('mongoose');

var config = {
  mail: require('./config/mail')
};

// Accounts
var Account = require('./models/Account')(config, mongoose, nodemailer);

app.configure(function(){
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public'));
  app.use(express.limit('1mb'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session(
    {secret: "NodeAuth secret key", store: new MemoryStore()}
  ));
  mongoose.connect('mongodb://localhost/nodeauth');
});

app.get('/', function(req, res){
  res.render('index.jade');
});

app.post('/login', function(req, res) {
  console.log('login request');
  var email = req.param('email', null);
  var password = req.param('password', null);

  if(null == email || email.length < 1 || null == password || password.length < 1) {
    res.send(400);
    return;
  }
  
  Account.login(email, password, function(success) {
    if(!success) {
      res.send(401);
      return;
    }
    console.log('login success');
    req.session.loggedIn = true; 
    
    res.send(200);
  });
});

app.post('/register', function(req, res) {
  var firstName = req.param('firstName', '');
  var lastName = req.param('lastName', '');
  var nickName = req.param('nickName', '');
  var email = req.param('email', null);
  var password = req.param('password', null);

  if(null == email || email.length < 1 
      || null == password || password.length < 1) {
    res.send(400);
    return;
  }
  
  Account.register(email, password, firstName, lastName, nickName);
  res.send(200);
});

app.get('/account/authenticated', function(req, res) {
  if(req.session.loggedIn) {
    res.send(200);
  } else {
    res.send(401);
  }
});

app.post('/forgotpassword', function(req, res) {
  var hostname = req.headers.host;
  var resetPasswordUrl = 'http://' + hostname + '/resetPassword';
  var email = req.param('email', null);

  if(null == email || email.length < 1) {
    res.send(400);
    return;
  } 
  
  Account.forgotPassword(email, resetPasswordUrl, function(success) {
    if(success) {
      res.send(200);
    } else {
      // User or password not found
      res.send(400);
    }
  });
});

app.get('/resetPassword', function(req, res) {
  var accoundId = req.param('account', null);
  res.render('resetPassword.jade', {locals:{accountId:accountId}});
});

app.post('/resetPassword', function(req, res) {
  var accountId = req.param('accountId', null);
  var password = req.param('password', null);
  if(null != accountId && null != password) {
    Account.changePassword(accountId, password);
  }
  res.render('resetPasswordSuccess.jade');
});

app.listen(8080);
