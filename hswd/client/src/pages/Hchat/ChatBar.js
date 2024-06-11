import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import profileempty from "./images/profile-empty.png";
import { useAuth } from "../../Store/auth";
const ChatBar = ({ socket,myname, onSelectUser,frienddata ,requestmyfriend,myfriend,onSelectUseroffline}) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token,curl}=useAuth()

  useEffect(() => {
      if (socket.id&&myname!=="") {
        const myFunction = async (e) => {
          const userName = myname
          
            socket.emit("newUser", { userName:myname, socketID: socket.id });
            
          // await socket.emit("newUser", { userName, socketID: socket.id });
          // Your function logic here
        };
        myFunction();
      }
   
  }, [myname]);

  
  function onlineuser() {
  if (window.screen.width<992) {
   
      document.getElementById("chat__sidebar").style.display="none"
      document.getElementById("chat__main").style.display="block"
    }
  
  }


  

  useEffect(() => {
    socket.on("newUserResponse", (data,error) => {
      if (error) {
       
      }else{
       
        setUsers(data);
        setLoading(false);
   
      }
    });
  }, [socket, users]);

  // navbar handle

  function handleonline() {
    document.getElementById("online-user-list").style.display = "block";
    document.getElementById("myfriend-user-list").style.display = "none";
    document.getElementById("request-user-list").style.display = "none";
  }
  function handlemyfriend() {
    document.getElementById("online-user-list").style.display = "none";
    document.getElementById("myfriend-user-list").style.display = "block";
    document.getElementById("request-user-list").style.display = "none";
  }
  function handlerequest() {
    document.getElementById("online-user-list").style.display = "none";
    document.getElementById("myfriend-user-list").style.display = "none";
    document.getElementById("request-user-list").style.display = "block";
  }
 //handle add friend
 function  handleadd() {
  navigate(`/add-friend`);

 }
 
   const AcceptReject=async (validation,targetname)=> {
    window.location.reload();
  
     try {
       await axios.post(
         `${curl}/api/acceptreject`,{status:validation,targetname:targetname},
         {
           headers: {
             Authorization: `Bearer ${token}`,
           }
         }
       );
    
       
     } catch (error) {
       console.error('Error storing data accept reject :', error);
     }
   
   
   }
  
  return (
    <div className="chat__sidebar " id="chat__sidebar">
      <nav className="navbar rounded bg-transparent w-100">
        <div className="container-fluid d-flex justify-content-center w-100">
          <nav className="navbar navbar-expand-lg  w-100 ">
            <div className="container-fluid w-100 d-flex justify-content-center">
              {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
              {/* <div className="collapse navbar-collapse" id="navbarScroll"> */}
              <ul className="navbar-nav d-flex flex-row  my-2 my-lg-0 ">
                <li className="nav-item ">
                  <button
                    className="btn "
                    onClick={handleonline}
                    
                 
                  >
                    Online 
                  </button>
                </li>
                <li className="nav-item ">
                  <button
                    className="btn"
                    onClick={handlemyfriend}
                
                  >
                    MyFriend
                  </button>
                </li>

                <li className="nav-item">
                  <button className="btn" onClick={handlerequest}>
                    Request
                  </button>
                </li>
              </ul>

              {/* </div> */}
            </div>
          </nav>
        </div>
      </nav>
      {/* <button onClick={}>btn</button> */}
      <div id="online-user-list" className="active-user-box h-75 p-3">
        <div className="d-flex flex-row align-items-center">
          <h4 className="chat__header fs-5 w-100">ACTIVE Friends Only</h4>
          <button className="chat__header px-2 btn btn-dark" onClick={handleadd}>Add+</button>
        </div>

        <div className="list-group2" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {users.map((user) =>
            myfriend.map((friend) => {
             
              if (
                user.userName != myname &&
                user.userName === friend.friend
              ) {
                if (loading) {
                  return (
                    <div
                      key={user.socketID}
                      className="spinner-border"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="d-flex  flex-row hover1"
                      style={{
                     
                        background: "none",
                        border: "none",
                      }}
                    
                      onClick={() => {
                        onSelectUser([user]),onlineuser();
                      }}
                      key={user.socketID}
                    >
                      <div className="w-75 d-flex flex-row align-items-center rounded-pill">
                  
                        {/* <div className="  d-flex"> */}
                          <img
                            src={profileempty}
                            className="img-fluid border border-dark rounded-circle"
                            alt="..."
                            style={{width:"22%"}}
                          />
                        {/* </div> */}
                      
                            <h5 className="px-3 m-0">{user.userName}</h5>
                            <p className=""></p>
                       
                      </div>
                    </div>
                  );
                }
              }
            })
          )}
        </div>
      </div>
     
        <div id="myfriend-user-list" className="active-user-box p-3">
          <div className="d-flex flex-row align-items-center">
            <h4 className="chat__header w-100">Your Friends</h4>
            
          <button className="chat__header px-2 btn btn-dark" onClick={handleadd}>Add+</button>
           
          </div>
          <div className="list-group2" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div className="list-group">
            {myfriend&& myfriend.map((friend) => (
              <div
                className=" mb-3 hover1"
                style={{
                 
                  background: "none",
                  border: "none",
                }}
                onClick={()=>{onSelectUseroffline([{userName:friend.friend}]),onlineuser()}}
                key={friend.friend}
              >
               <div className="w-75 d-flex flex-row align-items-center rounded-pill">
                  
                  {/* <div className="  d-flex"> */}
                    <img
                      src={profileempty}
                      className="img-fluid border border-dark rounded-circle"
                      alt="..."
                      style={{width:"22%"}}
                    />
                  {/* </div> */}
                
                      <h5 className="px-3 m-0">{friend.friend}</h5>
                      <p className=""></p>
                 
                </div>
              </div>
            ))}</div>
          </div>
          </div>
        <div id="request-user-list" className="request_message list-group p-3">
        <div className="d-flex flex-row align-items-center">
        
        <h4 className="chat__header w-100">New Request</h4>
          <button className="chat__header px-2 btn btn-dark" onClick={handleadd}>Add+</button>
          </div>
          <div className="list-group" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

        {requestmyfriend&&requestmyfriend.map((friend) => (
              <div
                className=" mb-3 hover1"
                style={{
                
                  background: "none",
                  border: "none",
                }}
                key={friend.friend}
              >
                 <div className="w-75 d-flex flex-row align-items-center rounded-pill">
                  
                  {/* <div className="  d-flex"> */}
                    <img
                      src={profileempty}
                      className="img-fluid border border-dark rounded-circle"
                      alt="..."
                      style={{width:"22%"}}
                    />
                  {/* </div> */}
                
                  <div className=" d-flex">
                      <h5 className="">{friend.friend}</h5>
                      <button onClick={()=>AcceptReject("accept",friend.friend)} >Accept</button>
                      <button onClick={()=>AcceptReject("reject",friend.friend)}>Reject</button>
                      <p className="-text"></p>
                    </div>
                 
                </div>
                  
                
                 
                
              </div>
            ))}</div>
        </div>
      
    </div>
  );
};

export default ChatBar;
