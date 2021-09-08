const express=require('express');
const path=require('path');
// const multer=require('multer');
const fs=require('fs');
const dealerservices=require('../Models/Dealer');

const app=express();
const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
    });
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: 'some-folder-name',
          format: async (req, file) => 'png', // supports promises as well
          public_id: (req, file) => 'computed-filename-using-request',
        },
      });
// const cloudinary=require('cloudinary');
// require('../Controllers/cloudinary');
// const cloudinaryStorage = require("multer-storage-cloudinary");
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploadFiles');
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
//   });
//   const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpeg') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
//   }
//    const uploads = multer({ storage: storage,fileFilter:fileFilter});

  const postDealerdata=app.post('/post-dealers',uploads.single('image'),(req,res,next)=>{
      var file=req.file.path;
     
      var dealer=new dealerservices;
      dealer.serviceName=req.body.serviceName;
      dealer.dealerservice=req.body.dealerservice;
      dealer.description=req.body.description;
      dealer.price=req.body.price;
     // dealer.pathImg= cloudinary.v2.uploader.upload(data.image);
     
        dealer.pathImg=`http://localhost:2000/${req.file.path}`
       
      //dealer.pathImg=  cloudinary.uploader.upload(req.file.path);
console.log(dealer.pathImg)
      
      dealer.img.contentType = 'image/png';
      dealer.save((err, result) => {
          console.log(result)
  
          if (err) return console.log(err)
          console.log('saved to database')
          res.send(dealer);
      })


  })

  const getDealerdata=app.get('/get-dealers',function(req,res,next){
    dealerservices.find().then(data => {
        res.status(200).send({ data });
    })
        .catch(err => {
            return res.status(500).send({
                Message: 'Unable to get. Please Try later.',
                err,
            });
        });

  })




  module.exports={getDealerdata,postDealerdata}