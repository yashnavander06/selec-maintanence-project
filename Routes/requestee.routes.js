const express = require('express')
const routers = express.Router();
const config = require('../config.json')
const { checkAuth, checkRole } = require('../Middleware/checkAuth.middleware')
const requesteeControllers = require('../Controllers/requestee.controllers')

//////////////////////////////////////////////////// Ticket Section ////////////////////////////////////////////////////

// get tickets
routers.get('/ticket', requesteeControllers.getTickets)

// add ticket
routers.post('/add_ticket', requesteeControllers.addTickets)


module.exports = routers