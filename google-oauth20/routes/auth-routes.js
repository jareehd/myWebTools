const router = require('express').Router();
const passpost =require('passport')

router.get('/login',(req,res)=>{
    res.render('login',{user:req.user});
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

router.get('/google', passpost.authenticate(
    'google' ,{
        scope : ['profile']
    }
))

router.get('/google/redirect', passpost.authenticate('google') ,(req,res)=>{
    res.redirect('/profile')
})

module.exports = router;