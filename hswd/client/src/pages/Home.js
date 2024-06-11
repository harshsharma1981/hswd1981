import React from 'react'
import Navbar from './components/Navbar'
import MainSection from './components/HomeComponent/MainSection'
import Latest from './components/HomeComponent/Latest'
import "./Signup"
import Signup from './Signup'
import Login from './Login'
import Footer from './components/Footer'
import About from './components/HomeComponent/About'
const Home = () => {
    const closeModal =()=> {
   
        var modal = document.getElementById('signupModal');
        var modal2 = document.getElementById('loginModal');
    $(modal).modal('hide');
        $(modal2).modal('hide');
     
      }
  return (
    <div>
   <Signup closeModal={closeModal}/>
   <Login closeModal={closeModal}/>
      <Navbar/>
      <MainSection/>
      <About/>
      
      <Latest/>
      <Footer/>
     
    </div>
  )
}

export default Home
