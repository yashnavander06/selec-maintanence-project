const mongoose = require('mongoose')
const Schema = mongoose.Schema

const role = new Schema({
    name: {
        type: String,
        index: true
    }
})

const user = new Schema({
    user_id: {
        type: Number,
        require: true,
        unique: true,
        index: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    first_name: {
        type: String,
        require: true
    },
    middle_name: String,
    last_name: String,
    mobile_phone: {
        type: Number,
        unique: true,
        range: 10,
    },
    email_id: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    company_name: {
        type: String,
        require: true
    },
    roles: [role],
    is_admin: {
        type: Boolean,
        require: true
    },
    is_coordinator: {
        type: Boolean,
        require: true
    },
    is_technician: {
        type: Boolean,
        require: true
    },
    note: String,
    interfaces: String,
    asset_category: [{
        type: Schema.Types.ObjectId,
        ref: "assetsList"
    }],
    asset_list: [{
        type: Schema.Types.ObjectId,
        ref: "assetData"
    }]


})

const Role = mongoose.model('role', role)
const User = mongoose.model('user', user)

module.exports = { Role, User }