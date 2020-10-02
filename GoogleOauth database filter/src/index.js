const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')
const mongoose = require('mongoose');

const userRouter= require('./routers/user-router')
const jobRouter= require('./routers/phone-router')
const authRoutes = require('./routers/auth-router');

const keys = require('../config/keys')

mongoose.connect(keys.mongoDB.dbURI,{
    useNewUrlParser: true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify:false
})
require('./utils/passport')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

app.set('view engine' ,'ejs')

app.use(cookieSession({
    maxAge : 24 * 60 * 60 * 1000 ,
    keys : [keys.session.key]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth',authRoutes)
app.use(userRouter)
app.use(jobRouter)

app.get('/',(req,res)=>{
    res.render('home',{user:req.user})
})

app.listen(port,() =>{
    console.log('Server is up on',port)
})