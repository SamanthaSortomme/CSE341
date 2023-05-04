const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actors');
const { auth, requiresAuth } = require('express-openid-connect');



router.get('/', actorsController.getAll);
//==================================================================
// router.post('/', requiresAuth(), validation.saveContact, actorsController.create);

// router.put('/:id', requiresAuth(), validation.saveContact, actorsController.modify);

// router.delete('/:id', requiresAuth(), actorsController.deleteOne);
//==================================================================

router.post('/', requiresAuth(), actorsController.create);

router.put('/:id', requiresAuth(), actorsController.modify);

router.delete('/:id', requiresAuth(), actorsController.deleteOne);

module.exports = router;
