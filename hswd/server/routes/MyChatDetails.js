const express = require("express")
const MyChatDetails=express.Router()

MyChatDetails.get("/", async(req,res)=>{

const  mylist=[]
for (let index in req.userData.sentrequestfriendlist) {
mylist.push(req.userData.sentrequestfriendlist[index].friend);
 
}
const  mylist2=[]
for (let index in req.userData.friendlist) {
mylist2.push(req.userData.friendlist[index].friend);
 
}
let usernotfriend1=req.alluser
for (let index in mylist2) {
   usernotfriend1=  usernotfriend1.filter(e=>e.username!=mylist2[index])
 
            
}
for (let index in mylist) {
  
   usernotfriend1=  usernotfriend1.filter(e=>e.username!=mylist[index])
            
}

req.userData.myfriendlist=mylist2
req.userData.usernotfriend=usernotfriend1
res.json(req.userData)

})

module.exports =MyChatDetails