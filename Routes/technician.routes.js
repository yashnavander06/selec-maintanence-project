const express = require('express')
const routers = express.Router();
const technicianControllers = require('../Controllers/technician.controllers')
const { checkAuth, checkRole } = require('../Middleware/checkAuth.middleware')
const config = require('../config.json')
// routers.post('/upload', technicianControllers.imageUpload);

routers.get('/workorder',checkAuth, checkRole(config.ROLE.TECHNICIAN_INTERNAL),technicianControllers.workOrder);
routers.get('/ticketdisplay',checkAuth, checkRole(config.ROLE.TECHNICIAN_INTERNAL),technicianControllers.ticketDisplay);
// update ticket
routers.put('/ticket/:ticketid',ticketControllers.updateRequesteeTicket)

// close ticket
routers.patch('/ticket/:ticketid',ticketControllers.updatestatusRequesteeTicket)
module.exports = routers;
