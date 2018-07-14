const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.js');
const CardSet = require('../models/cardSet.js');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

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

router.post('/create-course', (req, res) => {
  const newCourse = new Course({
    name: req.body.name
  })
  newCourse.save()
  .then(response => {
    res.send(response);
  })
  .catch(error => {
    res.send(error);
  })
});
router.post('/edit-course/:courseid', (req, res) => {
  // edit existing course name
})

router.post('/create-set', (req, res) => {
  const newSet = new CardSet({
    author: req.body.author, // change to use req.user.username!!
    title: req.body.title,
    subject: req.body.subject,
    cards: req.body.cards //array of card objects each w a term and definition
  });
  newSet.save()
  .then(response => {
    res.send(response);
  })
  .catch(error => {
    res.send(error);
  })
});

router.post('/edit-set/:setid', (req, res) => {
  // edit existing card set
})

router.get('/subjects', (req, res) => {
  //get all subjects the currently logged in user has made

})

router.get('/sets/:subject', (req, res) => {
  //get all sets under the specified class
  CardSet.find( { subject: req.params.subject }, (err, sets) => {
    if (!err) {
      res.send(sets)
    } else {
      console.log(err);
    }
  })
})

router.get('/study/:id', (req, res) =>{
  cardSet.findById(req.params.id, (err, cardSet) => {
    res.send(cardSet)
  })
});

module.exports = router;

//im wondering:
//is it better to have subjects and card sets
//as a part of the user collection in mongoDB

//git hub so we can collab
