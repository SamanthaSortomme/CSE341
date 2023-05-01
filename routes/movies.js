const express = require('express');
const router = express.Router();
const { body } = require('express-validator');


const moviesController = require('../controllers/movies');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', moviesController.create);

router.put('/:id', [body("releaseYear").isInt(), body("movieLength").isInt() ], moviesController.modify);

router.delete('/:id', moviesController.deleteOne);

module.exports = router;
