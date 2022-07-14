const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticket = Schema({
    client_id: {
        type: Schema.Types.ObjectId
    },
    subject: {
        type: String,
        maxlength: 150,
        require: true,
        default: ""
    },
    open_at: {
        type: Date,
        require: true,
        default: Date.now()
    },
    company: {
        type: String,
        require: true,
        default: "selec"
    },
    status: {
        type: String,
        maxlength:30,
        require:true,
        default:"Pending operator response"
    }
})

module.exports = {Ticket: mongoose.model("ticket", ticket)}