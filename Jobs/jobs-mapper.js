const ticketSchedular = require('./ticket-schedular')

// jobs will be listed here
module.exports = {

    ticket_schedular: {
        time: "1 seconds",
        type: 'every',
        handler: ticketSchedular
    },
    
}
