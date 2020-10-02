const express= require('express')
const Phone = require('../models/phone-model')
const router = express.Router()

router.get('/home' , (req,res)=>{
    res.render('home',{user:req.user})
})

router.get('/user/dashboard', async (req,res)=>{
        const phones = await Phone.find({})
        res.render('dashboard',{ phones:phones ,user:req.user})
});

router.post('/user/dashboard/filter' ,  async (req,res)=>{
    
    console.log(req.body);
    const condition = req.body;
    const phones = await Phone.find({})
    
    const filteredPhones = phones.filter((phone)=>{
         return ( ( !condition.phoneBrand || phone.phoneBrand.toLowerCase()==condition.phoneBrand.toLowerCase() ) &&
         ( !condition.phoneSize || phone.phoneSize.toLowerCase()==condition.phoneSize.toLowerCase() ) &&
         ( !condition.phonePrice || phone.phonePrice.toLowerCase() <= condition.phonePrice.toLowerCase() ) &&
         ( !condition.phoneType || phone.phoneType.toLowerCase()==condition.phoneType.toLowerCase() ) )
     })

    res.render('dashboard',{ phones:filteredPhones ,user:req.user})
})

module.exports=router