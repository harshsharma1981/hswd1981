const express= require("express")
const DiaryRegister = require("./models/DiaryRegister")
const GetDiary=express.Router()

GetDiary.get("/",async(req,res)=>{
const diarydata= await DiaryRegister.findOne({username:req.userData.username})

try {
    
    res.json(diarydata.diaryEntry)
} catch (error) {
    console.log(error)
}
})

module.exports=GetDiary
