const mongoose = require('mongoose')
const Schema = mongoose.Schema

const images = Schema({
    name: String,
    image: {
        data: Buffer,
        contentType: String
    }
})

const taskList = Schema({
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
})

const checkList = Schema({
    machine_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'machineData'
    },
    date: Date,
    checklist: taskList

})

let checklist = mongoose.model('checkList', checkList);
let imageModel = mongoose.model('images', images);


module.exports = {
    checklist,
    imageModel
}