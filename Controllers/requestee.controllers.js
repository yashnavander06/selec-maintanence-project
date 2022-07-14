const {Ticket} = require('../Models/ticket.models')

//////////////////////////////////////////////////// Ticket Section ////////////////////////////////////////////////////

// get tickets
const getTickets = async(req,res)=>{
    try {
        if(req.query.subject){
            const ticket = await Ticket.find({ subject: { $regex: subject }})
            if (!ticket) return res.status(404).json({msg:"no tickets found"})
            return res.status(200).json({data:ticket})
        }
        const tickets = await Ticket.find({})
        const total = tickets.length
        if (total === 0) return res.status(404).json({msg:"no tickets found"})

        return res.status(200).json({data:tickets,totalcount:total})
    } catch (error) {
        return new Error(error)
    }
}

// add ticket
const addTickets = async(req,res)=>{
    try {
        const newTicket = new Ticket(req.body)
        newTicket.client_id = ""
        const ticketData = await newTicket.save()
        if (ticketData === null) return res.status(501).json({msg:"unable to create ticket, try again"})
        return res.status(201).json({msg: "ticket created successfully"})
    } catch (error) {
        return new Error(error)
    }
}

// update ticket

// close ticket

// delete ticket

module.exports= {getTickets, addTickets}