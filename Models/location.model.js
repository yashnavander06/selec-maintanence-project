const mongoose = require('mongoose')
const Schema = mongoose.Schema

const location = Schema({
    unit_or_building: {
        type: String,
        require: true
    },
    floor: {
        type: String,
        require: true
    },
    group_or_BU: {
        type: String,
        require: true
    },
    line_name: {
        type: String,
        require: true
    },
    locality: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    pin_code: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('location', location)