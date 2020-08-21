const express= require('express');
const app = express();
const passportSetup =require('./config/passport');
const profileRoutes = require('./routes/profile-routes');
const authRoutes = require('./routes/auth-routes');
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

app.set('view engine' ,'ejs');


app.use(cookieSession({
    maxAge : 24 * 60 * 60 * 1000 ,
    keys : [keys.session.key]
}))

app.use(passport.initialize());

app.use(passport.session());

mongoose.connect(keys.mongoDB.dbURI , {useNewUrlParser: true ,useUnifiedTopology: true}  ,()=> console.log('mongodb is connected') )

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

app.get('/',(req,res)=>{
    res.render('home',{user:req.user});
})

app.listen(3000,()=> console.log('server in running in port 3000'));