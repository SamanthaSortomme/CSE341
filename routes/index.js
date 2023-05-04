const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
// router.use('/contacts', require('./contacts'));
router.use('/movies', require('./movies'));
router.use('/actors', require('./actors'));
router.use('/profile', require('./profile'));

module.exports = router;