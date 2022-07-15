const router = require('express').Router()
const Breeding = require('../models/breeding.model')

router.get('/', (req, res) => {
    Breeding.find()
    .then(docs => {
        res.json(docs)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/add', (req, res) => {
    const {date, procedure, deadline} = req.body
 
    Breeding.create({
        date,
        procedure,
        deadline,
    }).then(docs => {
        res.json(docs)
    }).catch(err => {
        res.json(err)
    })
})

router.put('/update/:id', (req, res) => {
    Breeding.findByIdAndUpdate(req.params.id, {
        procedure: req.body.desc,
        date: req.body.date
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router