const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actors');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', actorsController.getAll);

router.post('/', isAuthenticated, actorsController.create);

router.put('/:id', isAuthenticated, actorsController.modify);

router.delete('/:id', isAuthenticated, actorsController.deleteOne);

module.exports = router;
