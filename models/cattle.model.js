const mongoose = require('mongoose')
const Note = require('./note.model')

const Cattle = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, default: 'Cattle'},
    sex: {type: String, required: true},
    DOB: {type: Date, required: true, default: Date.now},
    sire: {type: mongoose.Schema.Types.ObjectId, ref: 'Cattle'},
    dam: {type: mongoose.Schema.Types.ObjectId, ref: 'Cattle'},
    offsprings: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Cattle' }
    ],
    notes: [
        {type:mongoose.Schema.Types.ObjectId, ref: 'Note' }
    ],
    breeding: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Breeding'}
    ],
    disposition: {
        date: {
            type: Date,
        },
        cause: {
            type: String
        }
    }
})

const model = mongoose.model('Cattle', Cattle)

module.exports = model 