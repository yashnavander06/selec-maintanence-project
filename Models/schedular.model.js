const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schedule = new Schema({
    asset_category: {
        type: Schema.Types.ObjectId,
        ref: 'assetsConfig'
    },
    asset_list: {
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: 'checkList'
    }
})

module.exports = mongoose.model('schedule', schedule)