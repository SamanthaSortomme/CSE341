const routes = require('express').Router();
const myController = require('../controllers')

routes.get('/', myController.nameFunction)

module.exports = routes;
