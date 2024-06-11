import React from 'react'
import "../../components-css/HomeComponentCss/latest.css"
import hchat from "./images/hchat.png"
import hdiary from "./images/hdiary.png"
import { Link } from 'react-router-dom'
const Latest = () => {
  return (
    <div className='main-latest-cont'>
      <div className="container-md main-latest-cont py-3" id='latestcont'>  
      <h1 className='py-3' id='latest-heading'>Latest</h1>
      <div className=" container-md latest-cont px-0" id='mycards' >
      
      <div className="card mycard" >
  <img src={hchat} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">H-Chat</h5>
    <Link to="/hchat" className="btn btn-primary">Go To H-Chat</Link>
  </div>
</div>
      <div className="card mycard" >
  <img src={hdiary} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">H-Diary</h5>
    <Link to="/hdiary" className="btn btn-primary">Go To H-Diary</Link>
  </div>
</div>
</div>
   </div>
    </div>
  )
}

export default Latest
