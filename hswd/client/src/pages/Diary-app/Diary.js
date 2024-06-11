import React, { useEffect, useState } from 'react'
import Dnav from './component/Dnav'
import SideList from './component/SideList'
import DScreen from './component/DScreen'
import "./component-css/diary.css"
import { useAuth } from '../../Store/auth'
import axios from 'axios'
import Confirmdelete from './component/Confirmdelete'
import AccessRestricted from '../AccessRestricted'
function Diary() {
const {curl,token,isLoggedIn}=useAuth()
const [Sdiaries,setSdiaries]=useState([])
const [diaries,setdiaries]=useState([])

const [validation, setValidation] = useState("false")
  const [diarydata, setdiarydata] = useState({
    title: "",
   diary:""
  });
  useEffect(() => {
    fetchDiary()
  }, []);
  const fetchDiary = async()=>{
  try {
      const response = await axios.get(`${curl}/api/getDiary`,{ headers: {
          Authorization: `Bearer ${token}`,
      }})
    
      setdiaries(response.data)
      setSdiaries(response.data)
     
      
  } catch (error) {
    
  }
  }
  const handleChangediary = (e) => {
      const { name, value } = e.target;
      const dSave = document.getElementById('dSave');

// Disable the button
dSave.disabled = false;
      setdiarydata((prevState) => ({
        ...prevState,
        [name]: value,
        date:document.getElementById("date").value,
        _id:validation
      }));
     
    };
const addDiary=()=>{

document.getElementById("dscreen").style.display="flex"
document.getElementById("dscreen-text").style.display="none"
document.getElementById("title").value= ""
document.getElementById("diaryId").value= "false"
document.getElementById("floatingTextarea2").value= "Type Something..."
setValidation("false")
localStorage.removeItem("diaryId")
if (window.innerWidth<769) {
  document.getElementById("sidebar").style.display="none"
    
  }
}

const handleSave = async (e) => {
  e.preventDefault();
  try {
 
    // Send POST request to backend API endpoint
    if(diarydata.title!=="")
   { 
    document.getElementById("sidebar").style.display="block"
    if (window.innerWidth<769) {
    document.getElementById("dscreen-text").style.display="none"
    document.getElementById("dscreen").style.display="none"
      
    }
   
   
 
    const response0 = await axios.post(`${curl}/api/diary`,diarydata ,
    {
      headers: {
        Authorization: `Bearer ${token}`,
    }
        }).then(()=>{
        
        setValidation("false")
        fetchDiary()
      })
      
    }
    else{
    alert("invailed credentials check your Signup info")
    }
  } catch (error) {
    console.error('Error:', error);
    
  // alert(JSON.stringify(error.response.data))
    
  }
};
const selectedDiary=(diary)=>{
try {
  document.getElementById("dscreen").style.display="flex"
document.getElementById("dscreen-text").style.display="none"
const title = document.getElementById("title")
const date = document.getElementById("date")
const diarytext = document.getElementById("floatingTextarea2")
const diaryId = document.getElementById("diaryId")
title.value=diary.title
date.value=diary.date
diarytext.value=diary.diary
diaryId.value=diary._id
localStorage.setItem("diaryId",diary._id)
setValidation(diary._id)

setdiarydata({title:document.getElementById("title").value})
if (window.innerWidth<769) {
document.getElementById("sidebar").style.display="none"
}
const dSave = document.getElementById('dSave');

// Disable the button
dSave.disabled = true;
} catch (error) {
  
}
}
const deleteDiary= async(diaryId)=>{


try {

  document.getElementById("sidebar").style.display="block"
  document.getElementById("dscreen").style.display="none"
  document.getElementById("dscreen-text").style.display="flex"
  if (window.innerWidth<769) {
  document.getElementById("dscreen-text").style.display="none"
  document.getElementById("dscreen").style.display="none"
    
  }
  setdiaries(diaries.filter(e=>e._id!==diaryId) )
  localStorage.removeItem("diaryId")
  const deleteresponse = await axios.post(`${curl}/api/deletediary`,{diaryId} ,
  {
    headers: {
      Authorization: `Bearer ${token}`,
  }
      })
   
     
  
  


  

} catch (error) {
  
}
}
const searchDiary=(e)=>{
  const { name, value } = e.target;

// fetchDiary()
let slist=[]
Sdiaries.map(d=>{
  if (d.title.toLowerCase().includes(value.toLowerCase())||d.diary&&d.diary.toLowerCase().includes(value)){
  slist.push(d)
}
})
setdiaries(slist)



}
  return (
    <div>
    {isLoggedIn?(<div>
    <Dnav searchDiary={searchDiary} addDiary={addDiary}/>
    <div className="main-diary-section d-flex w-100 bg-light">
    
    <SideList  selectedDiary={selectedDiary} diaries={diaries}/>
    <div className="main-diary-section-text" id='dscreen-text'>Welcome to Hdiary</div>
    <DScreen handleSave={handleSave} handleChangediary={handleChangediary}/>
    <Confirmdelete deleteDiary={deleteDiary}/>
    </div>
    </div>
    ):(
   <AccessRestricted/>
    )}
  
    </div>
  )
}

export default Diary