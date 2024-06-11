import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Store/auth";
const Addfriend1 = () => {

const {mychatdetailData,token,curl}=useAuth()
const [inputValue, setInputValue] = useState('');
const [alluser, setalluser] = useState([]);
const [sentrequestfriendlist, setsentrequestfriendlist] = useState([]);
const [myfriendlist, setmyfriendlist] = useState([]);
const [myfriend, setmyfriend] = useState([]);
const [searchstatus, setsearchstatus] = useState(true);
const [usernotfriend, setusernotfriend] = useState([]);
// const [addfrienddata, setaddfrienddata] = useState({ username:''});

useEffect(() => {
  // Run your function when data is received

  myfrienddata()



}, [mychatdetailData]); // Specify 'data' as a dependency to trigger the effect when it changes


  const myfrienddata= ()=>{
    try { 
   setmyfriend(mychatdetailData.friendlist)
      setalluser(mychatdetailData.alluser);
      setsentrequestfriendlist(mychatdetailData.sentrequestfriendlist);
      setmyfriendlist(mychatdetailData.myfriendlist);
      const a=mychatdetailData.alluser
      const f= mychatdetailData.friendlist
      setusernotfriend(mychatdetailData.usernotfriend)
    } catch (error) {
      console.error("Error set data:", error);
    }
  }
  





const  handleaddfriend =(event)=>{
// let value = document.getElementById("addfriend").value
setsearchstatus(false)
document.getElementById("addfriend").value=document.getElementById("addfriend").value.toLowerCase()
setInputValue(event.target.value);


}
const selectedaddfriend = async (e) => {
// setaddfrienddata(e)

  
  try { 

    const response = await axios.post(
    `${curl}/api/receiveaddfriend`,{e},
    {
   headers: {
     Authorization: `Bearer ${token}`,
 }
     }
      
);
 
 } catch (error) {
  console.error('Error storing data:', error);
  }
 };


  return (
    <div>
     <div className="add-friend-cont">
    
    <nav className="navbar sticky-top navbar-light bg-light">
  <a className="navbar-brand px-5 py-2" href="#">HChat</a>
      <div className="input-group mb-3 px-5 py-3">
        <input
       
        value={inputValue}
        onChange={handleaddfriend}
          type="text"
          id="addfriend"
      
          className="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            Button
          </button>
        </div>
      </div>
</nav>

      <div className="list-group px-5" id="searchelement">
  {
  
 inputValue&&myfriend&&myfriend.map((friend)=>(
 <div key={friend.friend}>{
 inputValue&&friend.friend &&JSON.stringify(friend.friend).includes(inputValue)?(
  <li   key={friend.friend} className="list-group-item list-group-item-action d-flex flex-row align-items-center "><div className="w-100">
<div className="float-start pt-2">{friend.friend } </div> <button className="chat__header float-end px-2 my-0 btn btn-success"  >Friend</button></div>

 </li>
 ):(false)
  }
 </div>
 ))
  }
    {
    
   inputValue&&sentrequestfriendlist&&sentrequestfriendlist.map((friend)=>(
   <div key={friend.friend}>{
   inputValue&&friend.friend &&JSON.stringify(friend.friend).includes(inputValue)?(
    <li   key={friend.friend} className="list-group-item list-group-item-action d-flex flex-row align-items-center "><div className="w-100">
    <div className="float-start pt-2">{friend.friend } </div> <button className="chat__header float-end px-2 my-0 btn btn-success"  >Requested</button></div>
    
     </li>
   ):(false)
   
   
   
    }
   </div>
   ))
    }
  {
  
 inputValue&&usernotfriend&&usernotfriend.map((user)=>(
 <div key={user.username}>{
 inputValue&&user.username &&JSON.stringify(user.username).includes(inputValue)?(
  <li   key={user.username} className="list-group-item list-group-item-action d-flex flex-row align-items-center "><div className="w-100">
  <div className="float-start pt-2">{user.username} </div> <button className="chat__header float-end px-2 my-0 btn btn-primary" onClick={()=>selectedaddfriend(user)}  >Add</button></div>
  
   </li>
 ):(false)
 
 
 
  }
 </div>
 ))
  }
  
       
      </div>
     
      </div>
    </div>
  );
};

export default Addfriend1;

{/* <li   key={friend.username} className="list-group-item list-group-item-action d-flex flex-row align-items-center ">
     {friend.username } <button className="chat__header ms-49 px-2 my-0 btn btn-primary" onClick={()=>selectedaddfriend(friend)} >Add</button>
  
     </li>
      */}
     