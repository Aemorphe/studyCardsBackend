const express = require('express');
const router = express.Router();
const models = require('../models/user.js');
//const passport = require('passport');

module.exports = function(passport) {
  router.post('/register', (req, res) => {
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    newUser.save()
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.send(error);
    })
  });

  router.post('/login', passport.authenticate('local'), (req, res) => {
    // now req.user contains the authenticated user
    // res.redirect('/')
    res.json({user: req.user})
  });
  return router;
};
