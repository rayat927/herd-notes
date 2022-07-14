const mongoose = require('mongoose')

const Note = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    date: {type: Date, default: Date.now},
    desc: {type: String},
    deadline: {type: Date, default: Date.now},
    timer: {type: String}
})

const model = mongoose.model('Note', Note)

module.exports = model