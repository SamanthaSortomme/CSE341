const express = require('express');
const router = express.Router();

const actorsController = require('../controllers/actors');

router.get('/', actorsController.getAll);
//==================================================================
router.post('/', requiresAuth(), validation.saveContact, actorsController.create);

router.put('/:id', requiresAuth(), validation.saveContact, actorsController.modify);

router.delete('/:id', requiresAuth(), actorsController.deleteOne);
//==================================================================

// router.post('/', actorsController.create);

// router.put('/:id', actorsController.modify);

// router.delete('/:id', actorsController.deleteOne);

module.exports = router;
