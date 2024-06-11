const express = require("express")
const DiaryRegister = require("./models/DiaryRegister")
const route=express.Router()
const { ObjectId } = require("mongodb")

route.post("/",async(req,res)=>{
try {
   
    const result =await DiaryRegister.updateOne({username:req.userData.username},{$pull:{diaryEntry:{_id:new ObjectId(req.body.diaryId)}}})
} catch (error) {
    console.log(error)
}

})
module.exports=route