const newsModel=require("../models/newsApiModel")


let fetchNewsData=async(req,res)=>{
    try{
            const regex = new RegExp(req.query.filter||'','i');
            let filter=  { $or: [{title: regex },{description: regex}]}
            if(req.query.api1==='false' || req.query.api2==='false'){
                if(req.query.api1==='true'){
                    filter['apiname']='newsapiorg'
                }else if(req.query.api2==='true'){
                    filter['apiname']='gnews'
                }else{
                    filter['apiname']=''
                }
        }    
        let data = await newsModel.find(filter).sort({date:-1})
        res.status(200).send({success:true,data:data})
    }   
    catch(error){
        res.status(500).send({success:false,message:error.message})
    }
}

module.exports=fetchNewsData







