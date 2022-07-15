const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const cattleRouter = require('./routes/Cattle.route')
const noteRouter = require('./routes/Note.route')
const userRouter = require('./routes/User.route')
const breedingRouter = require('./routes/Breeding.route')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb+srv://fyaz_rayat:123rubaiRayat@cluster0.tndut.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((result) => console.log('connected to db'))  
  .catch(e => console.log(e))

 
app.use('/cattle', cattleRouter)
app.use('/note', noteRouter)
app.use('/user', userRouter)
app.use('/breeding', breedingRouter)

app.listen(PORT, () => console.log('server on port 8000'))