const express=require("express")
const {check} = require('express-validator');

const router=express.Router();

const UserController=require("../Controllers/UserController");


router.post("/signup",
[
check('name').not().isEmpty(),


check('email').normalizeEmail().isEmail(),
check('password').isLength({max:20})



],UserController.SignUp);

router.post("/login",UserController.Login);
router.get("/logout",UserController.Logout);

router.get("/gettingusers",UserController.getUser);


module.exports=router;