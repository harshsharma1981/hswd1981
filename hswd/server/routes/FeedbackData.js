const express= require("express")
const FeedbackRegister = require("./models/FeedbackRegister")
const FeedbackData=express.Router()
FeedbackData.post("/",async(req,res)=>{
    
try {
    if (req.body.fName!==""&&req.body.fEmail!==""&&req.body.fFeedback!=="") {
        const result=await FeedbackRegister.updateOne({username:req.username},{$push:{feedback:req.body}})
        return res.status(201).json({ok:'FeedBack Sumbmitted Successfully' });
    }
    else{
        return res.status(400).json({ error: 'Something Went Wrong' });

    }
} catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Something Went Wrong' });
    
}
})
module.exports=FeedbackData