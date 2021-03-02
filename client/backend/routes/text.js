const express=require('express');
const router=express.Router()
const {botText}=require('../controller/text')

router.post('/text',botText)

module.exports=router