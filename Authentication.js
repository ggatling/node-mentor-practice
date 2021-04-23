const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

router.post('/login',loginUser);
router.post('/logout', logout);

//below code is for session stoarge using cookies

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));


function loginUser(req,res,callback) {
    const handler = passport.authenticate({})
    handler(req,res,callback)
}