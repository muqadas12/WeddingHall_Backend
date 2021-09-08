const cloudinary=require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name:'dpt9qa7ms',
    api_key:'755591287886294',
    api_secret:'***************************'	

});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "DEV",
    },
  });