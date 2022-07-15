const router = require('express').Router()
const Cattle = require('../models/cattle.model')

router.get('/', (req, res) => {
    Cattle.find()
    .populate('sire')
    .populate('dam')
    .populate('offsprings')
    .populate('notes')
    .then(all => {
        res.json(all)
    }).catch(err => {
        res.json(err) 
    })
})

router.get('/name/:name', (req, res) => {
    Cattle.find({name: req.params.name})
    .then(docs => {
        res.json(docs)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/add', (req, res) => {
    const {name, sex, DOB, sire, dam} = req.body
    Cattle.create({
        name,
        sex,
        DOB,
        sire,
        dam
    })
    .then(doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    })
})

router.put('/offsprings/update/:id',(req, res) => {
    Cattle.findByIdAndUpdate(req.params.id, {
        $push: {
            offsprings: req.body.id
        }
    }).then(doc => {
        res.json(doc)
    })
})

router.put('/update/:id',(req, res) => {
    const {name, sex, DOB, sire, dam} = req.body
    Cattle.findByIdAndUpdate(req.params.id, {
        name,
        sex,
        DOB,
        sire,
        dam
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        console.log(err)
    })
})

router.put('/notes/update/:id',(req, res) => {
    Cattle.findByIdAndUpdate(req.params.id, {
        $push: {
            notes: req.body.id
        }
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    })
})

router.put('/breeding/update/:id', (req, res) => {
    Cattle.findByIdAndUpdate(req.params.id, {
        $push: {
            breeding: req.body.id
        }
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    })
})


router.get('/:id', (req, res) => {
    Cattle.findById(req.params.id)
    .populate('sire')
    .populate('dam')
    .populate('offsprings')
    .populate('notes')
    .then(all => {
        res.json(all)
    }).catch(err => {
        res.json(err) 
    })
})

router.put('/dam/:id', (req, res) => {
    Cattle.findByIdAndUpdate(req.params.id, {
        dam: req.body.id
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    })
})

router.put('/sire/:id', (req, res) => {
    Cattle.findByIdAndUpdate(req.params.id, {
        sire: req.body.id
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    })
})

router.put('/disposition/:id', (req,res) => {
    Cattle.findByIdAndUpdate(req.params.id, {
        disposition: {
            date: req.body.date,
            cause: req.body.cause
        }
    })
})

module.exports = router