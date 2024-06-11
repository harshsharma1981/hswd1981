import React, { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./chat.css";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import axios from "axios";
import { useAuth } from "../../Store/auth";
import AccessRestricted from "../AccessRestricted";

const ChatPage = ({ socket }) => {
  const { mychatdetailData, isLoggedIn } = useAuth();
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState({});
  const lastMessageRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState([]);
  const [messagesclient, setMessagesclient] = useState([]);
  const [myname, setmyname] = useState();
  const [myfriend, setmyfriend] = useState([]);
  const [requestmyfriend, setrequestmyfriend] = useState([]);
  const [messagedate, setmessagedate] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const feeddata = async () => {
      
      setmyname(mychatdetailData.username);
      setmyfriend(mychatdetailData.friendlist);
      setrequestmyfriend(mychatdetailData.requestfriendlist);
    };
    feeddata();
  }, [mychatdetailData]);

  useEffect(() => {
    socket.on("privateMessage", (data1) => setMessages([...messages, data1]));
  }, [socket, messages]);
  useEffect(() => {
    socket.on("privateMessageStore", (data12) => setMessages(data12));
  }, [socket, messages]);
  useEffect(() => {
    socket.on("deleteprivateMessage", (data3) => {
    const newmessageArray=messages.filter((obj)=>obj.messageId!==data3.messageId)

    setMessages(newmessageArray)
    });
  }, [socket, messages]);
  useEffect(() => {
    const mylist=[]
    for(let i in messages){
    if (!mylist.includes(messages[i].date)) {
      
      mylist.push(messages[i].date)
    }
    }
    setmessagedate(mylist)

  }, [socket, messages]);

  let timeoutfortyping = setTimeout(() => {
    setTypingStatus("");
  }, 8000);
  useEffect(
    () => {
      socket.on("typingResponse", (data, error) => {
        if (error) {
        
        } else {
         
          setTypingStatus(data);

          clearTimeout(timeoutfortyping);
          timeoutfortyping = setTimeout(() => {
            setTypingStatus("");
          }, 8000);
        }
      });
    },
    [socket],
    [typingStatus]
  );

  const handleSelectUser = (user) => {
    if (window.screen.width >= 992) {
      document.getElementById("chat__main").style.display = "block";
    }
    document.getElementById("welcome").style.display = "none";
    document.getElementById("welcome2").style.display = "none";

    setSelectedUser(user);
  };
  const handleSelectUseroffline = (user) => {
    if (window.screen.width >= 992) {
      document.getElementById("chat__main").style.display = "block";
    }

    document.getElementById("welcome").style.display = "none";
    document.getElementById("welcome2").style.display = "none";

    setSelectedUser(user);
  };
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, handleSelectUser]);

  return (
    <div className="">
      {isLoggedIn ? (
        <div className="chat container-fluid p-0">
          <ChatBar
            socket={socket}
            myname={myname}
            onSelectUser={handleSelectUser}
            onSelectUseroffline={handleSelectUseroffline}
            myfriend={myfriend}
            requestmyfriend={requestmyfriend}
          />

          <div className="chat__main" id="chat__main">
            <div
              id="welcome2"
              className="welcome h-100 w-100 justify-content-center align-items-center"
            >
              <h3 id="welcome">Welcome To HChat</h3>
            </div>

            {Array.isArray(selectedUser) &&
              selectedUser.map((item) => (
                <div className="h-100  chatting-cont" key={item.socketID}>
                  <ChatBody
                    socket={socket}
                    messages={messages}
                    myname={myname}
                    headingname={item.userName}
                    selectedUserid={item.socketID}
                    selectedUsername={item.userName}
                    typingStatus={typingStatus}
                    lastMessageRef={lastMessageRef}
                    messagedate={messagedate}
                  />

                  <ChatFooter
                    socket={socket}
                    myname={myname}
                    recipientId={item.socketID}
                    selectedUsername={item.userName}
                  />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <AccessRestricted />
      )}
    </div>
  );
};

export default ChatPage;
