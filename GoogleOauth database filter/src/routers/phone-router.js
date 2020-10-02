const express= require('express')
const mongoose = require('mongoose')
const Phone = require('../models/phone-model')
const router = express.Router()
const authCheck= require('../middleware/authCheck')

router.get('/addPhone', authCheck ,(req,res)=>{
    res.render('add-phone', {user:req.user})
})

router.post('/addPhone',(req,res)=>{
        new Phone({
        googleID:req.user.googleID,
        phoneBrand:req.body.phoneBrand,
        phoneSize: req.body.phoneSize,
        phoneType: req.body.phoneType,
        phonePrice:req.body.phonePrice
    }).save().then(
        res.redirect('/user/dashboard')
    )
})

router.post('/phone/delete', async (req,res)=>{
    
    try{
      await Phone.findOneAndDelete( { _id: mongoose.Types.ObjectId(req.body._id) } )
    }
    catch(err){
       console.log(err);
    }
    
    res.redirect('/user/dashboard')
})
module.exports=router