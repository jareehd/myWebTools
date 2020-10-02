const router = require('express').Router();
const passpost =require('passport')

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
    console.log( 'redirect to home' , req.user);
    res.redirect('/home')
})

module.exports = router;