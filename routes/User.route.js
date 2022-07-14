const router = require('express').Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    User.find().populate('cattles')
    .then(doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/signup', (req, res) => {
   const {username, email, password} = req.body

   User.findOne({username: username}).then(data => {
    if(data){
        res.json({
            message: 'User already exists'
        })
    } else{
        bcrypt.hash(password, 10, (err, result) => {
            if(err){
                res.json({message: 'error hashing password'})
            }
            else{
                User.create({
                    username,
                    email,
                    password: result
                }).then(doc => {
                    // console.log(doc);
                    const token = jwt.sign({
                        id: doc._id,
                        email: email,
                        username: username,
                    }, 'secret123', {expiresIn: '1d'})

                    res.json({
                        id: doc._id,
                        email: email,
                        username: username,
                        token: token
                    })
                }).catch(error => {
                    res.json(error)
                })
            }
        })
    }
   })
})

router.post('/login', (req, res) => {
    const {email, password} = req.body
    User.find({email: email})
    .then(doc => {
        if(doc){
            bcrypt.compare(req.body.password, password, (err, result) => {
                if(err){
                    res.json({
                        message: 'Incorrect Password'
                    })
                } else {
                    console.log(doc)
                    const token = jwt.sign({
                        id: doc[0]._id,
                        email: doc[0].email,
                        username: doc[0].username,
                    }, 'secret123', {expiresIn: '1d'})

                    res.json({
                        id: doc[0]._id,
                        email: doc[0].email,
                        username: doc[0].username,
                        token: token})
                }
            })
        } else {
            res.json({
                message: 'Incorrect email'
            })
        }
    }).catch(error => {
        res.json(error)
    })
})

router.put('/cattles/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        $push: {
            cattles: req.body.id
        }
    }).then(doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .populate('cattles')
    .then(doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    }) 
})

module.exports = router

