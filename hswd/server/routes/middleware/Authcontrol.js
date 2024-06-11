const jwt = require("jsonwebtoken")
const ChatRegister = require("../models/ChatRegister")
const Register = require("../models/Register")

const AuthControl = async(req,res,next)=>{

    const token =  req.header("Authorization")
    
    if (!token){
        res.status(401).json({error:"eror"})
    }
    try {

    // You can use the user agent string for various purposes, such as logging or device detection
   
        t2=token.replace("Bearer", "").trim()
        const veryfyuser = jwt.verify(t2, process.env.SECRETKEY)
        const user = await Register.findOne({_id:veryfyuser._id})
        const user2 = await Register.findOne({_id:veryfyuser._id}).select("-password").select("-confirmpassword")
        req.token= t2
        const chatdata = await ChatRegister.findOne({username:user2.username})
        const chatdata2 = await ChatRegister.find({}).select("-friendlist").select("-requestfriendlist").select("-sentrequestfriendlist").select("-_id")
       
       req.alluser=chatdata2
       req.username=user2.username
        req.userData= {name:user2.name,username:user2.username,friendlist:chatdata.friendlist,requestfriendlist:chatdata.requestfriendlist,alluser:chatdata2,sentrequestfriendlist:chatdata.sentrequestfriendlist,email:user2.email}
     next()
    } catch (error) {
        res.status(401).json({error:"eror"})

    }
}

module.exports= AuthControl