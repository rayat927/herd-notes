const mongoose = require('mongoose')

const Breeding = mongoose.Schema({
    // {date: Date, name: String, procedure: String, timer: String}
    date: {type: Date, required: true},
    name: {type: String, required: true},
    procedure: {type: String, required: true},
    deadline: {type: Date},
    timer: {type: String}
})

const model = mongoose.model('Breeding', Breeding)

module.exports = model