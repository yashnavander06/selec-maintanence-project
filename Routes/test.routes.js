const express = require('express')
const routers = express.Router();
const adminControllers = require('../Controllers/admin.controllers')


routers.post('/', adminControllers.addUser)

module.exports = routers;