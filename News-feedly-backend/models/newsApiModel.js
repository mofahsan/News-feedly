const mongoose=require("mongoose")


let newsSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    content:{
        type:String
    },
    newsUrl:{
        type:String
    },
    image:{
        type:String
    },
    date:{
        type:String
    },
    apiname:{
        type:String
    }

})

module.exports=mongoose.model("news",newsSchema)