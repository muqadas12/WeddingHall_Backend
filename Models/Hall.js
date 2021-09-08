const mongoose=require('mongoose');

const Hallschema=mongoose.Schema({
    name:{
        type:String,
        require:true

    },
    city:{
        type:String,
        require:true

    },
    VenueType:{

        type:String,
        require:true
    },
    description:{
        type:String,
        require:true

    },
    MaximumCapacity:{
        type:String,
        require:true

    },
    MinimumGuest:{
        type:String,
        require:true

    },
    Hall:{

        type:String,
        require:true
    },
    Services:{
        type:String,
        require:true

    }



})
module.exports=mongoose.model('Hall',Hallschema);