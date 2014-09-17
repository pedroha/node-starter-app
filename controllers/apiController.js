var passport = require('passport'),
    mongoose = require('mongoose');

var User = mongoose.model('User', User);  

// GET - lists all users
exports.getUsers = function(req, res) {
  return User.find(function (err, users) {
    if (err) {
      return console.log(err);
    } else {
      req.query.perpage = req.query.perpage ? req.query.perpage : Infinity;
      req.query.page = req.query.page ? req.query.page : 1;
      var first = req.query.perpage * (req.query.page - 1);
      first = isNaN(first) ? 0 : first;
      first = first >= users.length ? 
            (users.length - req.query.perpage <= 0 ? 
            0 :users.length - req.query.perpage) : first;
      users = users.slice(first,first + req.query.perpage);
      return res.send(users);
    }
  });
};

// POST - add new user
exports.postUsers = passport.authenticate('local-signup', function(req, res) {
  var user;
  user = new User({
    "email": req.body.email,
    "password": req.body.password
  });
  user.save(function (err) {
    if (!err) {
      return console.log("success");
    } else {
      return console.log(err);
    }
  });
  return res.send(user);
});

// GET - lists user with specific id
exports.getUserById = function(req, res) {
  return User.findById(req.params.id, function (err, user) {
    if (err) {
      res.json(404, {"message":"no such user"});
      return console.log(err);
    } else {
      return res.send(user);
    }
  });
};

// PUT - update user details
exports.putUserById = passport.authenticate('local-signup', function(req, res) {
  return User.findById(req.params.id, function (err, user) {
    user.email = req.body.email;
    user.password = req.body.password;
    return user.save(function (err) {
      if (!err) {
        res.json(200, {"message":"success"});
      } else {
        console.log(err);
      }
      return res.send(user);
    });
  });
});

// DELETE - delete user by id
exports.deleteUserById = function (req, res) {
  return User.findById(req.params.id, function (err, user) {
    return user.remove(function (err) {
      if (!err) {
        console.log("removed successfully");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
};


//  // POST - login user
//  exports.postLogin = function(req, res) {};
//  
//  // POST - logout user
//  exports.postLogout = function(req, res) {};
//  
//  // GET - login user using oAuth
//  exports.getOAuth = function(req, res) {};
//  
//  // POST - direct login with token
//  exports.postOAuth = function(req, res) {};
//  
//  // GET - oAuth redirection endpoint
//  exports.getOAuthCode = function(req, res) {};
//  
//  // GET - list linked providers
//  exports.getProviders = function(req, res) {};
//  
//  // GET - give info of a specific provider
//  exports.getProviderIndex = function(req, res) {};
//  
//  // DELETE - unlink a provider
//  exports.deleteProvider = function(req, res) {};
//  
//  // GET - link new provider to account
//  exports.getOAuthLink = function(req, res) {};
//  
