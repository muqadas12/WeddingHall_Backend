

const HttpError = require("../Models/http-error");
const { validationResult } = require("express-validator");
const User = require("../Models/UserModel");
const uuid = require("uuid");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const express=require("express")
const app=express(express)


const getUser = (req, res) => {
 User.find().then(dataL => {
      res.status(200).send({
          dataL
          
      });
      console.log(dataL)
  }).catch(err => {
      res.status(500).json(err);
      console.log(err)
  });
};





const SignUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name,role, email, password, } = req.body;
console.log(name,role, email, password);
  User.findOne({ email: email }).then(user => {
    if (user) {
      if (user.email == email ) {
        console.log(user.email, email);
        console.log('email matched');
        const error = new HttpError(
          'User exists already, please login instead.',
          422
        );
        return next(error);
      }
    } else {
  bcryptjs.hash(password, 12).then((hashedpassword) => {
        const createdUser = new User({
          name,
          role,
          email,
          
          password: hashedpassword
        });
        createdUser.save()
          .then((SavedUser) => {

            let token;
            try {
              token = jwt.sign({ userId: SavedUser._id, email: SavedUser.email }, 'supersecret_dont_share', { expiresIn: '1h' })
            } catch (err) {
              const error = new HttpError(
                'Signing up failed, please try again later.',
                500
              );
              return next(error);
            }
            console.log(token, SavedUser);
            res
              .status(201)
              .json({ userId: SavedUser._id, email: SavedUser.email, token: token });
          })
          .catch(err => {
            const error = new HttpError(
              'Signing up failed, please try again later.',
              500
            );
            return next(error);
          });
      });
    }
  }).catch(err => {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  });
}




const Login = async (req, res, next) => {
  const { email, password,role } = req.body;

  let existingUser;
  // req.session.existingUser=existingUser;
  // req.session.save();

  try {
    existingUser = await User.findOne({ email: email })
    console.log(existingUser)
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }
  
  console.log(password, existingUser.password);
  bcryptjs.compare(req.body.password, existingUser.password).then(result => {
    // if password match create payload
    console.log(result);
    if (result) {
      console.log('matched');
      let token;
    
      try {
        token = jwt.sign(
          { userId: existingUser.id, email: existingUser.email,role:existingUser.role },
          'supersecret_dont_share',
          { expiresIn: '1h' }
        );
        console.log(token)

      } 
      
      
      catch (err) {
        const error = new HttpError(
          'Logging in failed, please try again later.',
          500
        );
        return next(error);
      }

      res.json({
        userId: existingUser.id,
        email: existingUser.email,
        role:existingUser.role,
         token: token
      });
       console.log(token)
      console.log(existingUser.role)
      console.log(email)

    //   req.session.userId = result
    //  console.log(req.session.userId)
    } else {
      console.log('invalid');
      const error = new HttpError('Invalid credential');
      return next(error)
    }
  });
  res.cookie('jwt',token,{
    httpOnly:true
  })

}

  const Logout=async(req,res,next)=>{
    try{
      res.clearCookie('jwt','')
      await req.user.save();

    }
    catch(err){
      const error = new HttpError(
        'Logging out failed, please try again later.',
        500
      );
      return next(error);

    }
  }


exports.getUser = getUser;
exports.SignUp = SignUp;
exports.Login = Login;
exports.Logout = Logout;


