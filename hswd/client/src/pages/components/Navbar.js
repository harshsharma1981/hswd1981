import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import "../components-css/navbar.css"
import { useAuth } from '../../Store/auth'

const Navbar = () => {
const [theme,settheme]=useState('')
const {isLoggedIn}= useAuth()
useEffect(()=>{
if (!isLoggedIn) {
  
  document.getElementById("signup").click()
}
},[])
const themechange=  ()=>{
const themebar= document.getElementById("flexSwitchCheckChecked")
localStorage.removeItem("theme")

if (themebar.checked==true) {
document.body.style.backgroundColor="#ECF9FF"
    document.getElementById("navcont").style.background="#E5E0FF"
    document.getElementById("navcont").style.color="#2C3639"
    document.getElementById("latest-heading").style.color="#2C3639"
    document.getElementById("mycards").style.color="#ECF2FF"
    document.getElementById("mycards").style.background="#2C3639"
    document.getElementById("footer").style.background="#E5E0FF"
    document.getElementById("footer").style.color="#2C3639"
    document.getElementById("about").style.color="#2C3639"
    localStorage.setItem("theme","light")
    settheme("Light")
}
else if (themebar.checked==false) {
document.body.style.backgroundColor="#3F4E4F"
    document.getElementById("navcont").style.background="#2C3639"
    document.getElementById("navcont").style.color="#FCF8E8"
    document.getElementById("latest-heading").style.color="#FCF8E8"
    document.getElementById("about").style.color="#FCF8E8"
 
    document.getElementById("latestcont").style.color="ECF2FF"
    document.getElementById("mycards").style.background="black"
    document.getElementById("footer").style.background="#2C3639"
    document.getElementById("footer").style.color="#FCF8E8"
    localStorage.setItem("theme","dark")
    settheme("Dark")
}

}

  
  useEffect(() => {
      
          const themebar2= document.getElementById("flexSwitchCheckChecked")
          
          if (localStorage.getItem("theme")==="light") {
         
             themebar2.checked=true
             themechange()
             settheme("light")
          }
          if (localStorage.getItem("theme")==="dark") {
             themebar2.checked=false
             themechange()
             settheme("Dark")
             
          }
    
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg nav-cont py-3" id='navcont'>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">HSWD |</a>
    <div className="d-flex align-items-center">
    <div className="navbar-toggler px-0  mobile-theme">
    
   {window.screen.width<=992 && (
    
    <div className="d-flex align-items-center form-check form-switch align-items-center border-none">
  <input className="form-check-input mb-0 " type="checkbox" onChange={themechange} role="switch"  id="flexSwitchCheckChecked"  />
  
</div>)

   }
</div>
{isLoggedIn?(
    <div className="navbar-toggler" id="logut" type="button">
  <Link className="nav-link" to="/logout">Logout </Link>
</div>):(
    <div className="btn-primary navbar-toggler mobile-theme px-0 pe-2" id="signup" type="button" data-bs-toggle="modal" data-bs-target="#signupModal">
  <div className="px-1 btn-dark" type="submit"><i className="fa fa-user"></i> </div>
</div>)}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="fa fa-bars"></span>
    </button>
    
    </div>
    <div className="collapse navbar-collapse justify-content-center" id="navbarScroll">
      <ul className="navbar-nav my-2 my-lg-0 navbar-nav-scroll" style={{"--bs-scroll-height": "100px;"}}>
        <li className="nav-item">
          <Link className="nav-link"  to="/">Home</Link>
        </li>
        <li className="nav-item">
        <a className="nav-link"  href="#about">About</a>
        </li>
        <li className="nav-item dropdown">
        <a className="nav-link"  href="#latestcont">Project</a>
        </li>
        <li className="nav-item">
        <Link className="nav-link"  to="/feedback">Feedback</Link>        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
      </form>
   
    </div>
    <div className="form-check form-switch mb-0 fordesktop">
  <input className="form-check-input px-2 float-right fordesktop" type="checkbox" onChange={themechange} role="switch"  id="flexSwitchCheckChecked"  />
  <label className="form-check-label"  htmlFor="flexSwitchCheckChecked">{theme}</label>
</div>
    <div className="  fordesktop">
    {/* login logout */}
    
   
    {isLoggedIn?(
    <div className="btn-primary" id="logut" type="button">
  <Link className="px-1 btn-dark nav-link" to="/logout">Logout </Link>
</div>):(
 <div className="d-flex flex-row">
    <div className="btn-primary" id="signup" type="button" data-bs-toggle="modal" data-bs-target="#signupModal">
  <div className="px-1 btn-dark" type="submit">Sign Up </div>
</div>
<div className="btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">
  <div className="btn-dark" type="submit">/  Login</div></div>
</div>
)
    
    }
</div>

  </div>
</nav>
    </div>
  )
}

export default Navbar
