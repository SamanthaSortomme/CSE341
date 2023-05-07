const router = require('express').Router();
const passport = require('passport');
router.use('/', require('./swagger'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
//=================
// const express = require('express');
// const router = express.Router();

router.use('/', require('./swagger'));
// router.use('/contacts', require('./contacts'));
router.use('/movies', require('./movies'));
router.use('/actors', require('./actors'));
router.use('/profile', require('./profile'));

module.exports = router;
