const express = require('express');
const router = express.Router();
// const { body } = require('express-validator');
const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post(
  '/',
  isAuthenticated,
  validation.saveContact,
  moviesController.create
);

router.put(
  '/:id',
  isAuthenticated,
  validation.saveContact,
  moviesController.modify
);

router.delete('/:id', isAuthenticated, moviesController.deleteOne);

module.exports = router;
