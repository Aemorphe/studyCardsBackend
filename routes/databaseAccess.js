const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.js');
const CardSet = require('../models/cardSet.js');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/create-course', (req, res) => {
  const newCourse = new Course({
    name: req.body.name
  })
  newCourse.save()
  .then(response => {
    res.json(response);
  })
  .catch(error => {
    res.json(error);
  })
});
router.post('/edit-course/:courseid', (req, res) => {
  // edit existing course name
})

router.post('/create-set', (req, res) => {
  const newSet = new CardSet({
    author: req.user.username, // change to use req.user.username!!
    title: req.body.title,
    subject: req.body.subject,
    cards: req.body.cards //array of card objects each w a term and definition
  });
  newSet.save()
  .then(response => {
    res.json({success: response});
  })
  .catch(error => {
    res.json({error: error});
  })
});

router.post('/edit-set/:setid', (req, res) => {
  // edit existing card set
})

router.get('/subjects', (req, res) => {
  //get all subjects the currently logged in user has made
  // returns an array of subject names
  CardSet.find( { author: req.user.username }, (err, sets) => {
    if (!err) {
      let subjectsFromAllSets = sets.map(set => {
        return set.subject
      })
      let subjects = subjectsFromAllSets.filter((item, pos, self) => {
        return self.indexOf(item) == pos;
      })
      res.json({subjects: subjects})
    } else {
      console.log(err);
    }
  })

  //
  // a.filter( x => {
  //     if (!c.hasOwnProperty(x.a)){
  //         c[x.a] = true;
  //         return true;
  //     }
  //     return false;
  // });
})

router.get('/sets/:subject', (req, res) => {
  //get all sets under the specified subject
  CardSet.find( { subject: req.params.subject }, (err, sets) => {
    if (!err) {
      let cardSetTitles = sets.map(set => {
        return set.title
      })
      res.json({titles: cardSetTitles })
    } else {
      console.log(err)
    }
  })

  CardSet.find( { subject: req.params.subject }, (err, sets) => {
    if (!err) {
      sets.map(set => {

      })
    } else {
      console.log(err);
    }
  })
})

router.get('/study/:title', (req, res) =>{
  CardSet.find( { title: req.params.title }, (err, sets) => {
    if (!err) {
      let cards = sets.map(set => {
        return set.cards
      })
      res.json({cards: cards});
    } else {
      console.log(err)
    }
  })
});

module.exports = router;
