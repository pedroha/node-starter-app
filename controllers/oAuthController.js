var passport = require('passport');

// Authenticate with Facebook
exports.facebookAuth = passport.authenticate('facebook', { scope: 'email' });

// Callback
exports.facebookAuthCallback = passport.authorize('facebook', { 
                                });

// Authenticate with Google
exports.githubAuth = passport.authenticate('google', { scope: 'profile email' });

// Callback
exports.githubAuthCallback = passport.authorize('github', { 
                                });


// Authenticate with Twitter
exports.githubAuth = passport.authenticate('twitter', { scope: 'email' });

// Callback
exports.githubAuthCallback = passport.authorize('twitter', { 
                                });
