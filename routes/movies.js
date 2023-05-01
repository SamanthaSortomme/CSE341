const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', validation.saveContact, moviesController.create);

router.put('/:id', validation.saveContact, moviesController.modify);
//[body("releaseYear").isInt(), body("movieLength").isInt() ],

router.delete('/:id', moviesController.deleteOne);

module.exports = router;
