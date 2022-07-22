const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assetData = new Schema({
    asset_name: {
        type: String,
        // require: true,
        unique: true
    }
}, { timestamps: true })

const assetsConfig = new Schema({
    asset_category: {
        type: String,
        unique: true,
        // require: true
    },
    asset_list: [assetData],
    template_master: {
        type: Schema.Types.ObjectId,
        ref: "machineData"
    }
}, { timestamps: true })

let assetsconfig = mongoose.model('assetsConfig', assetsConfig);
let Asset = mongoose.model('assetData', assetData);
module.exports = { assetsconfig, Asset }