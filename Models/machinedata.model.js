const mongoose = require('mongoose')
const Schema = mongoose.Schema

const machineData = Schema({
    machine_internal_code: {
        type: String,
        unique: true,
        require: true
    },
    machine_external_code: {
        type: String,
        unique: true,
        require: true
    },
    model_number: {
        type: String,
        unique: true,
        require: true
    },
    software: {
        type: String,
        require: true
    },
    type: String

})

module.exports = mongoose.model('machineData', machineData)