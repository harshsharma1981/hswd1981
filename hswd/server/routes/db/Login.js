var express = require('express');
const Register = require('../models/Register');
const bcrypt = require("bcrypt");
const ChatRegister = require('../models/ChatRegister');

var router = express.Router();

require("./conn")

/* GET users listing. */
 
router.post('/', async function(req, res, next) {


  try {
    let {username,password} = req.body
    username = username.replace(/\s/g, "").trim();
  password =password.trim().replace(/\s/g, "");
    const userdata2=await Register.find({}).select("-_id").select("-friendlist")
 const veryfyuernames = []
 for (let index in userdata2) {
    veryfyuernames.push(userdata2[index].username)
 }
if (!veryfyuernames.includes(username)){
  return res.status(400).json({ error: 'Credential not match' });
  

}
else{

  const user = await Register.findOne({username:username})
  
  const ismatch = await bcrypt.compare(password, user.password)

 
  const token = await user.generateAuthToken();

  

  if(ismatch)  {
    
    res.status(201).json({success:"Login Successful",token})
    
  }
  
  else{
res.status(400).json({ error: 'Credential not match' });
  
 
  }
}
 
  } catch (error) {
    console.log("this is err at login ", error)
  }
  
});


//chat app logic



module.exports = router;
// module.exports = {sendusername