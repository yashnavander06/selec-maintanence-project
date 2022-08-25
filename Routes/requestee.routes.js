const express = require('express')
const routers = express.Router();
const config = require('../config/config.json')
const { checkAuth, checkRole } = require('../Middleware/checkAuth.middleware')
const requesteeControllers = require('../Controllers/requestee.controllers')
const TicketControllers = require('../Controllers/ticket.controllers')


//////////////////////////////////////////////////// Ticket Section ////////////////////////////////////////////////////

// get all tickets
routers.get('/ticket', checkAuth, checkRole(config.ROLE.REQUESTEE), TicketControllers.getRequesteeTickets)

// get one ticket
routers.get('/ticket/:ticketid', checkAuth, checkRole(config.ROLE.REQUESTEE), TicketControllers.getRequesteeOneTicket)

// add ticket
routers.post('/add_ticket', checkAuth, checkRole(config.ROLE.REQUESTEE), TicketControllers.addRequesteeTicket)

// update ticket
routers.put('/ticket/:ticketid',TicketControllers.updateRequesteeTicket)

// close ticket
routers.patch('/ticket/:ticketid',TicketControllers.updatestatusRequesteeTicket)

// delete ticket
routers.delete('/ticket/:ticketid', TicketControllers.deleteRequesteeTicket)

module.exports = routers