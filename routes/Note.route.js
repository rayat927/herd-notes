const router = require('express').Router()
const Note = require('../models/note.model')

router.get('/', (req, res) => {
    Note.find().then(docs => {
        res.json(docs)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/add', (req, res) => {
    const {date, desc, deadline} = req.body

    Note.create({
        date,
        desc,
        deadline,
    }).then(docs => {
        res.json(docs)
    }).catch(err => {
        res.json(err)
    })
})

router.put('/update/:id', (req, res) => {
    Note.findByIdAndUpdate(req.params.id, {
        desc: req.body.desc,
        date: req.body.date
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router