var express = require('express');
var router = express.Router();
const jwt=require("jsonwebtoken");
const Register = require('./models/Register');
const ChatRegister = require('./models/ChatRegister');

/* GET users listing. */
router.post('/', async function(req, res, next) {
  const token =  req.header("Authorization")
 
  if (!token){
    res.status(401).json({error:"eror"})
}
try {
 const  t2=token.replace("Bearer", "").trim()
  const veryfyuser = jwt.verify(t2, process.env.SECRETKEY)
  const userid=veryfyuser._id
  const user = await Register.findOne({_id:userid}).select("-password")
  const userdata=await ChatRegister.findOne({username:user.username})
  const userdata2=await ChatRegister.findOne({username:req.body.targetname})
  const targetid = (userdata._id).toString()
  const targetid2 = (userdata2._id).toString()

 
  
  
  if (req.body.status==="accept") {
    
    async function addObjectToArrayInNestedArray(documentId,documentIdToUpdate2, newObjectToAdd,newObjectToAdd2) {
      try {
      console.log("accept|")
      const result = await ChatRegister.updateOne(
          { _id: documentId }, // Filter by the document's _id
          { $push: { friendlist: newObjectToAdd } 
          ,$pull: { requestfriendlist: newObjectToAdd } }
          // Add the new object to the array field
        );
      const result2= await ChatRegister.updateOne(
          { _id: documentIdToUpdate2 }, // Filter by the document's _id
          { $push: { friendlist: newObjectToAdd2 },
          $pull: { sentrequestfriendlist: newObjectToAdd2 } }// Add the new object to the array field
        );
    
        
    
      } catch (error) {
          console.log("accept error",error);
      }
      }
      // Specify the ID of the document to update
  const documentIdToUpdate =targetid;
  const documentIdToUpdate2 =targetid2;
  // Specify the new object to add to the array
  const newObjectToAdd = await { friend: req.body.targetname };
  const newObjectToAdd2 = await { friend: user.username };
  // Call the function to add the object to the array
  const friendlist=[]
  const friendlist2=[]
  for (let index in userdata.friendlist) {
    friendlist.push(userdata.friendlist[index].friend)
   
  }
  for (let index in userdata2.friendlist) {
    friendlist2.push(userdata2.friendlist[index].friend)
  }
 
if (!friendlist.includes(newObjectToAdd.friend) && !friendlist2.includes(newObjectToAdd2.friend)) {
  addObjectToArrayInNestedArray(documentIdToUpdate,documentIdToUpdate2, newObjectToAdd,newObjectToAdd2);
}
    
  
  }
  else if (req.body.status==="reject") {
    async function removeObjectToArrayInNestedArray(documentId, objectToDelete,documentIdToUpdate2,newObjectToAdd) {
      try {
            console.log("reject|")
      const result = await ChatRegister.updateOne(
          { _id: documentId }, // Filter by the document's _id
          { $pull: { requestfriendlist: objectToDelete } }// Add the new object to the array field
        );
        const result2= await ChatRegister.updateOne(
          { _id: documentIdToUpdate2 }, // Filter by the document's _id
          {
          $pull: { sentrequestfriendlist: newObjectToAdd } }// Add the new object to the array field
        );
        
    
      } catch (error) {
          console.log(error);
      }
      }
      // Specify the ID of the document to update
  const documentIdToUpdate =targetid;
  // Specify the new object to add to the array
  const newObjectToAdd = { friend: req.body.targetname };
  const newObjectToAdd2 = { friend: user.username };
  const documentIdToUpdate2 =targetid2;
  
  // Call the function to add the object to the array
  const requestfriendlist=[]
  
 
      
      removeObjectToArrayInNestedArray(documentIdToUpdate, newObjectToAdd,documentIdToUpdate2,newObjectToAdd2);
  
  }
  
} catch (error) {
  console.log("err at aceept reject",error);
}

});

module.exports = router;
