const mongoose = require('mongoose')

const User = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true,},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cattles: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Cattle'}
    ]
})

const model = mongoose.model('User', User)

module.exports = model 