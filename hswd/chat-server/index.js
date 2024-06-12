//liberary import
require('dotenv').config({ path: '.env.chat' });
const express = require('express');
const app = express();
const PORT = 4000;
const jwt=require("jsonwebtoken")
require("./db/conn")
//New imports
const http = require('http').Server(app);
const cors = require('cors');
const { hostname } = require('os');
const MessageRegister = require('./models/MessageRegister');
const { v4: uuidv4 } = require('uuid');

// connection between server and client
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "https://hswd1981.netlify.app"
    }
    
});

// Authenticating user and creating entry
socketIO.use( (socket, next) => {
  const token = socket.handshake.query.token;
  const username = socket.handshake.query.username;

  // Verify JWT token
  jwt.verify(token, process.env.SECRETKEY, async(err, decoded) => {
    if (err) {
      return next(new Error('Authentication error'));
    }
    // Authentication successful, attach user information to socket object
    socket.user = decoded;
     const userdata2 =await MessageRegister.find({userid:socket.user._id}).select("-messageslist")

     const veryfyuserid = []
     const veryfyusername = []
     for (let index in userdata2) {
        veryfyuserid.push(userdata2[index].userid)
        veryfyusername.push(userdata2[index].username)
     }
  
     if (veryfyuserid.includes(socket.user._id)||veryfyusername.includes(username)){
       
       console.log("unAuthorized acces")
       
      }else{
       console.log(userdata2.username,username)
     
       const messageregister = new MessageRegister({
       userid:socket.user._id,
       username:username,
       messageslist:[]
       })
       await messageregister.save()
     }
    next();
  });
});

// varibles to store users which are online
let users = [];
let activeuser=[]

let messagesActive=[]
// socket connection function
socketIO.on('connection', (socket) => {

  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('privateMessage', async ({ to,toYou,receivername, message }) => {
    // Validate user authentication and authorization
    //here we are storing messages
   try {
const messageId = uuidv4();
   console.log(messageId)
   message.messageId=messageId
    let newmessageObj = (({ id,socketID ,...rest}) => rest)(message);
 
    // Push data into the inner array of the found child object
    const result1 = await MessageRegister.updateOne(
      { username: message.name }, // Filter by the document's _id
      { $push: { messageslist: newmessageObj } } // Add the new object to the array field
    );
    const result2 =await MessageRegister.updateOne(
      { username: message.receivername }, // Filter by the document's _id
      { $push: { messageslist: newmessageObj } } // Add the new object to the array field
    );
  

// Send the private message to the recipient's socket
const recipientSocketId=activeuser.find(obj=>obj.userName===message.receivername)
const senderSocketId=activeuser.find(obj=>obj.userName===message.name)
activeuser.map((user)=>{

if (user.userName===message.receivername) {
  
  socketIO.to(user.socketID).emit('privateMessage', message);
}

})
socketIO.to(senderSocketId.socketID).emit('privateMessage', message);
// socketIO.to(recipientSocketId).emit('privateMessage', message);

   } catch (error) {
    console.log(error)
   }
   
   
  });
  //delete message from database
socket.on("deleteMessage",async(data)=>{
try {
  const result1 = await MessageRegister.updateOne(
    { username: data.name }, // Filter by the document's _id
    { $pull: { messageslist: data } } // Add the new object to the array field
  );
  const result2 =await MessageRegister.updateOne(
    { username: data.receivername }, // Filter by the document's _id
    { $pull: { messageslist: data } } // Add the new object to the array field
  );
  const senderSocketId=activeuser.find(obj=>obj.userName===data.name)
 
  activeuser&&activeuser.map((user)=>{
  
  if (user.userName===data.receivername) {
    
    socketIO.to(user.socketID).emit('deleteprivateMessage', data);
  }
  
  })
  
  socketIO.to(senderSocketId.socketID).emit('deleteprivateMessage', data);
  
} catch (error) {
  console.log(error)
}
})
  

  socket.on('typing', ({data}) => 
 { console.log(data)
 console.log(data.selectedUsername)
  
 activeuser.map((user)=>{
  
  if (user.userName===data.selectedUsername) {
    
    socketIO.to(user.socketID).emit('typingResponse', data);
  }
  
  })
  
  }
  );

  //Listens when a new user joins the server
  socket.on('newUser',async (data) => {
    //Adds the new user to the list of users
    if (data.userName!="" && data.userName!=null){
      if(!users.some(el => el.socketID === data.socketID)){
           if (users.some(el => el.userName === data.userName)) {
        users = users.filter((user) => user.socketID !== data.userName);
        activeuser = activeuser.filter((user) => user.socketID !== data.userName);
               
        users.push(data);
      
     
        activeuser.push(data);
               console.log("200 ok ok ok")
      }
      else{
      
        users.push(data);
      
     
        activeuser.push(data);
      }
      }
     
      //Sends the list of users to the client
    }
    socket.emit('newUserResponse', users);
    socketIO.emit('newUserResponse', users);
 
    //here sending stored messages to user connected
    let mystoredmessageOBJ = await MessageRegister.findOne({username:data.userName});
    if (mystoredmessageOBJ) {
        let activeuserOBJ = activeuser.find(obj => obj.userName === data.userName);
        if (activeuserOBJ) {
            try {
            
              socketIO.to(activeuserOBJ.socketID).emit('privateMessageStore', mystoredmessageOBJ.messageslist);
           
            } catch (error) {
                console.error("Error sending private message:", error);
            }
        } 
    }
    
   
  });
// disconnectevent
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    //Updates the list of users when a user disconnects from the server
   
    users = users.filter((user) => user.socketID !== socket.id);
    activeuser = activeuser.filter((user) => user.socketID !== socket.id);
  
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});



http.listen(PORT, () => {
  console.log(`Server listening on http://192.168.0.7:${PORT}/`);
});
