import React, { useState } from 'react'
import "./components-css/feedback.css"
import { useAuth } from '../Store/auth'
import axios from 'axios'

import FeedbackAlert from './components/Feedback/FeedbackAlert'
const Feedback = () => {
const {curl,email,uName,token}= useAuth()
const [feedbackErrorDetails,setferror]=useState([])
const [textareaValue, setTextareaValue] = useState("");
const handleChange = (event) => {
  setTextareaValue(event.target.value);
};
const feedbackSend= async(e)=>{
e.preventDefault()
try {
  
  const fName=document.getElementById("fName").value
  const fEmail=document.getElementById("fEmail").value
  const fFeddback=document.getElementById("fFeedback").value
  if (!!fName&&!!fEmail!==""&&!!fFeddback) {
    
    const response = await axios.post(
      `${curl}/api/feedbackdata`,{fName,fEmail,fFeddback},
      {
     headers: {
       Authorization: `Bearer ${token}`,
   }
       }
        
  );
  if (response.data&&response.data.ok) {
    setferror([response.data])
  }
  setTextareaValue("")
 
  document.getElementById("feedbackAlertopenbtn").click()
  
  }
} catch (error) {
if (error.response&&error.response.data) {
  setferror([error.response.data])
  
}
  document.getElementById("feedbackAlertopenbtn").click()

  
}
}
  return (
    <div>
    <FeedbackAlert feedbackErrorDetails={feedbackErrorDetails}/>
      <div className="container-fluid d-flex justify-content-center align-items-center main-feedback-cont flex-column" id="feedback">
  <div className="feedback-cont pb-5 my-5 px-5 rounded">
    <h1 className="feedback-title pb-5 pt-4 d-flex justify-content-center">Feedback </h1>
    <form className="d-flex flex-column" action="/feedback-data" onSubmit={feedbackSend} method="post">
      <label className="fs-4" htmlFor="name">Name</label>
      <input className="form-control rounded-pill" id='fName' type="Name" defaultValue={uName} minLength="4" maxLength="20" name="Name"/>
      <label className="fs-4" htmlFor="email">Email</label>
      <input className="form-control rounded-pill" id='fEmail' type="email" defaultValue={email} minLength={"14"} maxLength="100" name="email"/>
      <label className="fs-4" htmlFor="feedback">Feedback</label>
      <textarea className="form-control rounded" id='fFeedback' name="feedback"  value={textareaValue} onChange={handleChange}  minLength={"10"} maxLength="150" cols="30" rows="5"></textarea>
      <button className="my-4 rounded fs-5">Submit</button>
    </form>
  </div>
</div>
    </div>
  )
}

export default Feedback
