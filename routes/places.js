var express = require('express');
var router = express.Router();

require('../models/connection');
const Place = require('../models/places');
const User = require('../models/users');

router.post('/newPlace', (req, res) => {
  const { name, description, tags, zipCode, image } = req.body;
  User.findOne({ token: req.body.token }).then((data) => {
    const newPlace = new Place({
      name: name,
      description: description,
      tags: tags,
      zipCode: zipCode,
      image: image,
    });
    newPlace.save().then((placeData) => {
      res.json({ result: true, place: placeData });
    });
  });
});

router.get('/getPlaces', (req, res) => {
  Place.find().then((data) => {
    res.json({ result: true, places: data });
  });
});

router.get('/getPlacesByTags/:tag', (req, res) => {
  Place.findOne({ tag: req.params.tag }).then((data) => {
    res.json({ result: true, place: data });
  });
});

module.exports = router;
