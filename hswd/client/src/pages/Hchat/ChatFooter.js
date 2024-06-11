import React, { useState } from 'react';

// Generate a random UUID for each message


const ChatFooter = ({ socket ,recipientId,selectedUsername,myname}) => {
  const currentDate = new Date();

  // Get the current year
  const year = currentDate.getFullYear();
  
  // Get the current month (0-indexed, so January is 0)
  const month = currentDate.getMonth() + 1; // Adding 1 to match human-readable month numbers
  
  // Get the current day of the month
  const day = currentDate.getDate();
  
  // Get the current hour (in 24-hour format)
  const hour = currentDate.getHours();
  
  // Get the current minute
  const minute = currentDate.getMinutes();
  
  // Get the current second
  const second = currentDate.getSeconds();
  
  // Get the current millisecond
  const millisecond = currentDate.getMilliseconds();
  
  // Log the current date and time
  
  const [message, setMessage] = useState('');

  const handleTyping = () =>{
    socket.emit('typing', {data:{typingmsg:`${myname} is typing`,selectedUsername,sendername:myname}});
  }
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && myname) {
      socket.emit('privateMessage', { to: recipientId,toYou:socket.id,receivername: selectedUsername, message: {
        text: message,
          name: myname,
          id: `${socket.id}${Math.random()}`,
           socketID: socket.id,
           receivername: selectedUsername,
           date:`${year}-${month}-${day}`,
           time:`${hour}:${minute}:${second}.${millisecond}`,
           sendtime:{hour:hour,minute:minute}
      } });
  
    }
    setMessage('');


  };
  
  return (<>
 
    <div className="chat__footer p-2">
      <form className="form d-flex " onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message w-100 p-2 rounded-pill border border-dark"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn"><i className="material-icons">&#xe163;</i></button>
      </form>
    </div>
    </>
  );
};

export default ChatFooter;