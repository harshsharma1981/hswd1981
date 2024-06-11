const express =require("express")
const DiaryRegister = require("./models/DiaryRegister")
const { ObjectId } = require("mongodb")
const route=express.Router()

route.post("/",async (req,res)=>{

const dataEntry = req.body



try{

if (dataEntry._id!=="false") {

    const result =await DiaryRegister.updateOne({username:req.userData.username},{$pull:{diaryEntry:{_id:new ObjectId(dataEntry._id)}}})
    const result3 =await DiaryRegister.updateOne({username:req.userData.username},{$push:{diaryEntry:dataEntry}})
   
    res.json({})
    
}
else if(dataEntry._id==="false"){
delete dataEntry._id
    const result2 =await DiaryRegister.updateOne({username:req.userData.username},{$push:{diaryEntry:dataEntry}})
   
    res.json({})
}
}
catch (error) {
    console.log("eroor at recive diary",error)
        
    }

}
)

module.exports=route