const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schedule = Schema({
    asset_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assetsConfig'
    },
    asset_list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assetData'
    },
    maintainence_type: {
        type: String,
        require: true
    },
    schedular: {
        type: Date,
        require: true
    },
    day: {
        type: Date,
        require: true
    },
    start_time: {
        type: Date,
        require: true
    },
    checklist_selection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'checkList'
    }
})

module.exports = mongoose.model('schedule', schedule)