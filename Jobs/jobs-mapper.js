const ticketSchedular = require('./ticket-schedular')

// jobs will be listed here
module.exports = {

    ticket_schedular: {
        time: "1 seconds",
        type: 'every',
        handler: ticketSchedular
    }
    
    // ticket_schedular1: {
    //     time: '3 seconds',
    //     type: 'every',
    //     handler: ticketSchedular
    // },
    // ticket_schedular2: {
    //     time: '5 seconds',
    //     type: 'every',
    //     handler: ticketSchedular
    // },
    // comp_schedular: {
    //     time: '6 months',
    //     type: 'every',
    //     handler: ticketSchedular
    // }

}
