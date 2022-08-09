const express = require('express')
const routers = express.Router();
const userController = require('../Controllers/user.controllers')

routers.post('/', userController.login);

module.exports = routers;