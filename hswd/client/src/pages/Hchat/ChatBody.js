import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({socket, messages,myname, lastMessageRef,typingStatus,headingname,selectedUserid,selectedUsername,messagedate }) => {
  const navigate = useNavigate();
const [Currentdate,setCurrentdate]=useState("")
  const handleLeaveChat = () => {
   if(window.screen.width<=992){
   document.getElementById("chat__main").style.display="none"
   document.getElementById("chat__sidebar").style.display="block"
   }
   else{
    document.getElementById("chat__main").style.display="none"
   
    if(window.screen.width>=992){
      document.getElementById("welcome").style.display = "block";
      document.getElementById("welcome2").style.display = "block";
      }
   
   }
  };
  useEffect(()=>{
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
  
  // Get the current month (0-indexed, so January is 0)
  const month = currentDate.getMonth() + 1; // Adding 1 to match human-readable month numbers
  
  // Get the current day of the month
  const day = currentDate.getDate();
    setCurrentdate(`${year}-${month}-${day}`)
  
  },[])
const deletemessage=(data)=>{
socket.emit("deleteMessage",data)
}
  return (
    <>

<header className="chat__mainHeader px-1 pt-1 bg-transparent border-dark pb-1 border-bottom d-flex align-items-center">
        <p className='p-0 m-0'>{headingname}</p>
       <div className='w-100'> <button className="leaveChat__btn btn btn-danger float-end" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button></div>
      </header>

      <div  className="message__container d-flex flex-column" id='message__container'>
      
      {messagedate.map((mdate)=>(
      
     <div>
     <div>
     {mdate===Currentdate?(
       <p className='w-100 d-flex justify-content-center'>Today</p>
      ):(
       <p className='w-100 d-flex justify-content-center'>{mdate}</p>
     )}
     </div>
        {
        
        messages.map((message) =>
         message.receivername==selectedUsername&&mdate===message.date  ? (
          <div className="w-100">  <div className="message__chats w-75 float-end d-flex flex-column me-3" key={message.socketID}>
              <div className="sender__name  "><p className='float-end'>You</p></div>
              <div className='dropdown message__sender rounded  w-auto '><div className=" rounded px-2 pe-3 py-1 send-text-cont w-auto float-end" data-bs-toggle="dropdown"role="button" aria-expanded="false">
                <p className='m-0'>{message.text}</p>
              
              </div>
              <ul class="dropdown-menu">
        <li><a class="dropdown-item" onClick={()=>deletemessage(message)}>Unsend</a></li>
      
      </ul>
            </div>
              <div className="sender__name  "><p className='float-end'>  {message.sendtime<"12:00"?
               ( <p className='m-0'>{message.sendtime.hour}:{message.sendtime.minute}Am</p>):(
                <p className='m-0'>{message.sendtime.hour-12}:{message.sendtime.minute}Pm</p>
               )
                }</p></div>
            </div></div>
          ) : message.name==selectedUsername&&mdate===message.date ?(
            <div className="w-100"> 
            <div className="message__chats w-75 float-start d-flex flex-column ms-1" key={message.id}>
           
           <div className="sender__name "><p className='float-start'>{message.name}</p></div>
              <div className="message__recipient rounded  w-auto  " >
              <div className=" px-3 ps-3 py-1 rounded receive-text-cont w-auto float-start">
                <p className='m-0'>{message.text}</p>
               
                <div ref={lastMessageRef} />
      
              </div> </div>
           <div className="sender__name "><p className='float-start'> {message.sendtime<"12:00"?
               ( <p className='m-0'>{message.sendtime.hour}:{message.sendtime.minute}Am</p>):(
                <p className='m-0'>{message.sendtime.hour-12}:{message.sendtime.minute}Pm</p>
               )
                }</p></div>
            </div>
           
            </div>
          ):(
           false
          )
        )}</div>
      ))}
        {typingStatus&&typingStatus.sendername===selectedUsername&&(
 <div className="message__status">
        <p>{typingStatus.typingmsg}</p>
        </div>
        
        )}
      </div>


    </>
  );
};

export default ChatBody;