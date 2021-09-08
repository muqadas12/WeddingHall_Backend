const mongoose=require('mongoose');

const hallSchema=new mongoose.Schema({
    cityName:{
        type:String,
        required:true
    },
    weddimgha:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('WeddingHall',hallSchema);