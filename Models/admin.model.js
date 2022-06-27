const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminDetails = new Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    }
});



module.exports = mongoose.model('Admin', adminDetails)