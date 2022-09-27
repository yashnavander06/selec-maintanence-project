const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schedule = new Schema({
    asset_category: {
        type: Schema.Types.ObjectId,
        ref: 'assetsConfig'
    },
    asset_name: {
        type: Schema.Types.ObjectId,
        ref: 'machineData'
    },
    maintainence_type: {
        type: String,
        require: true
    },
    schedular: {
        type: String,
        enum: ['weekly','quaterly','monthly','yearly'],
        require: true
    },
    day: {
        type: String,
        require: true
    },
    start_time: {
        type: String,
        require: true
    },
    checklist_selection: {
        type: Schema.Types.ObjectId,
        ref: 'checkList'
    }
}, { timestamps: true })

const Schedular = mongoose.model('schedule', schedule)
module.exports = { Schedular }