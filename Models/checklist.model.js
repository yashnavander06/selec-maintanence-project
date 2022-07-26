const mongoose = require('mongoose')
const Schema = mongoose.Schema

const images = new Schema({
    name: String,
    image: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true })

const taskList = new Schema({
    task: {
        type: String,
        unique: true,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    remark: String,
    image: images,
    final_status: {
        type: String,
        require: true
    }
}, { timestamps: true })

const checkList = new Schema({
    machine_name: {
        type: Schema.Types.ObjectId,
        ref: 'machineData',
        require: true
    },
    date: Date,
    checklist: taskList

}, { timestamps: true })

let checklist = mongoose.model('checkList', checkList);
let imageModel = mongoose.model('images', images);
let tasklist = mongoose.model('tasklist', taskList);

module.exports = {
    checklist,
    imageModel,
    tasklist
}