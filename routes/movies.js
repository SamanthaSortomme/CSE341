const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

//===================================================
// router.post('/', requiresAuth(), validation.saveContact, moviesController.create);

// router.put('/:id', requiresAuth(), validation.saveContact, moviesController.modify);


// router.delete('/:id', requiresAuth(), moviesController.deleteOne);

//===================================================

router.post('/', validation.saveContact, moviesController.create);

router.put('/:id', validation.saveContact, moviesController.modify);

router.delete('/:id', moviesController.deleteOne);

module.exports = router;
