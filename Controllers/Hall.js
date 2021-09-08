 const dataH=require('./data.json');
const hallSchema=require('../Models/Hall');




const getData = (req, res) => {
    hallSchema.find().then(dataH => {
         res.status(200).send({
             dataH
             
         });
         console.log(dataa)
     }).catch(err => {
         res.status(500).json(err);
         console.log(err)
     });
   };
module.exports={getData}