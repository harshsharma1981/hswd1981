var express = require("express");
var router = express.Router();
require("./conn");

const Register = require("../models/Register");
const ChatRegister = require("../models/ChatRegister");
const FeedbackRegister = require("../models/FeedbackRegister");
const DiaryRegister = require("../models/DiaryRegister");

/* GET home page. */

router.post("/", async function (req, res, next) {
console.log("post Signup")
 try {

  const {clientToken} = req.body;

  const existingUser = await Register.findOne({ devices: clientToken });

  if (existingUser) {
      // User already has an account on this device
      return res.status(400).json({ error: 'Currently At This Phase You Can Only Have One Account.If You Forget Details Of Previous Account Please contact hswd1981@gmail.com' });
  }
  else{let {name,username,password,confirmpassword,email}=req.body
  username = username.replace(/\s/g, "").trim();
  password =password.trim().replace(/\s/g, "");
  confirmpassword =confirmpassword.trim().replace(/\s/g, "");
 email.trim()
  
 
 const userdata2=await Register.find({}).select("-_id").select("-friendlist")
 const veryfyuernames = []
 const veryfyemail = []
 for (let index in userdata2) {
    veryfyuernames.push(userdata2[index].username)
 }
 for (let index in userdata2) {
    veryfyemail.push(userdata2[index].email)
 }
if (veryfyuernames.includes(username)){
  
  return res.status(400).json({ error: 'UserName Not Available' });


 }
if (veryfyemail.includes(email)){
  return res.status(400).json({ error: 'Email Is Already Associated With Other Account' });


 }
 else if (password!=confirmpassword) {
  return res.status(400).json({ error: 'password not matching confirm password' });
 
 
 }
 else if (name==="" || username==="" || password==="" || confirmpassword==="") {
  return res.status(400).json({ error: 'please check your signup info' });
 }
 else {
  try {
    
    const registeruser =new Register({
      devices:clientToken,
      name: name,
      username:username,
      email:email,
      password:password,
      confirmpassword: confirmpassword
    })
    const chatregisteruser =new ChatRegister({
      username:username
  
     
    })
    const feedbackregisteruser =new FeedbackRegister({
      username:username
    })
    const diaryregister =new DiaryRegister({
      username:username
    })
  
    const token = await registeruser.generateAuthToken();
   
    const Registered= await registeruser.save()
    const ChatRegistered= await chatregisteruser.save()
    const FeedbackRegistered= await feedbackregisteruser.save()
    const DiaryRegistered= await diaryregister.save()
res.status(201).json({success:"Congrajulations You are Now Memeber Of HSWD",token})
  } catch (error) {
    console.log("this error at signup page",error)
  }

 }}}catch (error) {
  console.log(error)
 }
 });

module.exports = router;