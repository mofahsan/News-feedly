const mongoose=require("mongoose")
require("dotenv").config

mongoose.connect(`mongodb://localhost/${process.env.DATABASE}`,{useNewUrlParser:true},(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("mongodb connected")
    }
})

