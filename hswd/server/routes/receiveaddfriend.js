var express = require('express');
const Register = require('./models/Register');
const ChatRegister = require('./models/ChatRegister');
var router = express.Router();
const jwt=require("jsonwebtoken")
/* GET users listing. */
router.post('/', async function(req, res, next) {
try {
    const {e} = req.body;
    const token =  req.header("Authorization")
    if (!token){
        res.status(401).json({error:"eror"})
    }
    try {
       
         t2=token.replace("Bearer", "").trim()
    const veryfyuser = jwt.verify(t2, process.env.SECRETKEY)
    
     const userid=veryfyuser._id
    const user = await Register.findOne({username:e.username}).select("-password").select("-confirmpassword")

    const userdata=await ChatRegister.findOne({username:user.username})
    const user2 = await Register.findOne({_id:userid}).select("-password").select("-confirmpassword")
const userdata2=await ChatRegister.findOne({username:user2.username})

   const usernameadd=user2.username
async function addObjectToArrayInNestedArray(documentId,documentIdToUpdate2, newObject,newObjectToAdd2) {
    try {
    const result = await ChatRegister.updateOne(
        { _id: documentId }, // Filter by the document's _id
        { $push: { requestfriendlist: newObject } } // Add the new object to the array field
      );
    const result2 = await ChatRegister.updateOne(
        { _id: documentIdToUpdate2 }, // Filter by the document's _id
        { $push: { sentrequestfriendlist: newObjectToAdd2 } } // Add the new object to the array field
      );

  
    } catch (error) {
        console.log(error);
    }
    }
    // Specify the ID of the document to update
const documentIdToUpdate =(userdata._id).toString();
const documentIdToUpdate2 =(userdata2._id).toString();
// Specify the new object to add to the array
const newObjectToAdd = { friend: usernameadd };
const newObjectToAdd2 = { friend: e.username };
// Call the function to add the object to the array
const requestfriendlist=[]
for (let index in userdata.requestfriendlist) {
    requestfriendlist.push(userdata.requestfriendlist[index].friend)
    
}
if (!requestfriendlist.includes(usernameadd)) {
    
    addObjectToArrayInNestedArray(documentIdToUpdate,documentIdToUpdate2, newObjectToAdd,newObjectToAdd2);
}
    } catch (error) {
    console.log(error);
        res.status(401).json({error:"eror"})

    }
   
 
} catch (error) {
console.log("eroor at recive friend",error)
    
}
});

module.exports = router;