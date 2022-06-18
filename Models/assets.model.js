const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assetData = Schema({
    asset_name: {
        type: String,
        require: true,
        unique: true
    }
})

const assetsConfig = Schema({
    asset_id: {
        type: Number,
        require: true,
        unique: true
    },
    asset_category: {
        type: String,
        unique: true,
        require: true
    },
    asset_list: asset,
    template_master: String
})

let assetsconfig = mongoose.model('assetsConfig', assetsConfig);
let asset = mongoose.model('assetData', assetData);
module.exports = { assetsconfig, asset }