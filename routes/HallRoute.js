const express=require('express');
const hallController=require('../Controllers/Hall')
const router=express.Router();

router.get('/gethalls',hallController.getData)
module.exports=router;