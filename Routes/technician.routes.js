const express = require('express')
const routers = express.Router();
const technicianControllers = require('../Controllers/technician.controllers')
const TicketControllers = require('../Controllers/ticket.controllers')
const { checkAuth, checkRole } = require('../Middleware/checkAuth.middleware')
const config = require('../config.json')
const { upload } = require('../Middleware/imageUpload.middleware')

routers.post('/upload', upload.single('image'), technicianControllers.imageUpload);

routers.get('/workorder', checkAuth, checkRole(config.ROLE.TECHNICIAN_INTERNAL), technicianControllers.workOrder);
routers.get('/ticketdisplay', checkAuth, checkRole(config.ROLE.TECHNICIAN_INTERNAL), technicianControllers.ticketDisplay);
// update ticket
routers.put('/updateTicket/:ticketid', checkAuth, checkRole(config.ROLE.TECHNICIAN_INTERNAL), TicketControllers.updateRequesteeTicket)


// open/close ticket
routers.patch('/acceptTicket/:ticketid', checkAuth, checkRole(config.ROLE.TECHNICIAN_INTERNAL), TicketControllers.updatestatusRequesteeTicket)
module.exports = routers;