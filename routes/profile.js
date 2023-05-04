const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actors');

router.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()){
        res.send(JSON.stringify(req.oidc.user));
    } else {
        res.send('Logged out');
    }
});


module.exports = router;