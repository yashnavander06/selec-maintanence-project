const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema

// Data Logs for data access and management using diff function
const LogSchema = new Schema({
    action: { type: String, required: true },
    category: { type: String, required: true },
    createdBy: { type: ObjectId, ref: 'users', required: true },
    message: { type: String, required: true },
    diff: { type: Schema.Types.Mixed },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})

LogSchema.index({ action: 1, category: 1 })

module.exports = mongoose.model('Log', LogSchema)