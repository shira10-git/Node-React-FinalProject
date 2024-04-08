const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({

    userName:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }, 
     name:{
        type:String,
       
    },
    email:{
        type:String,
        lowercase:true,
        // required:true,
        default:""
    },
    phone:{
        type:String
    },
    role:{
        type:String,
        enum:["manager","worker","advancedWorker"],
        default:"worker"
    },
    active:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
})
module.exports=mongoose.model("User",userSchema)