import React, { useEffect, useState } from "react";
import axios from 'axios'
import "./components-css/signup.css";
import { useAuth } from "../Store/auth";
import cryptoJs from "crypto-js";
import SignupAlert from "./components/Signup/SignupAlert";
const Signup = ({ closeModal }) => {
const {StoreTokenInLs,curl,LoginStatus}=useAuth()
const [signupErrorDetails,setsignupErrorDetails]=useState([])
  const [SignupData, setSignupData] = useState({
    name: "",
    username: "",
    password: "",
    confirmpassword:""
  });
  const handleChange = (e) => {
  document.getElementById("username-input").value=document.getElementById("username-input").value.toLowerCase()
    const { name, value } = e.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value.toLowerCase(),
      clientToken:localStorage.getItem("sessionidentify")
    }));
   
  };
 
 //here main logic for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend API endpoint
      if(SignupData.name!="" && SignupData.username!=""&& SignupData.password!=""&& SignupData.confirmpassword!="")
     { 
      const response = await axios.post(`${curl}/api/signup`, SignupData)
      

     
      const res_data = await response.data;
     
      
      // Reset form after successful submission
      if (res_data.token!==undefined) {
        
        StoreTokenInLs(res_data.token)
      setSignupData({
      name:'',
        username: '',
        password: '',
        confirmpassword:''
      });
      LoginStatus()
      
      document.getElementById("closesignupmodal").click()
      setsignupErrorDetails([res_data])
      document.getElementById("signupAlertopenbtn").click()
      }}
      else{
      alert("invailed credentials check your Signup info")
      }
    } catch (error) {
    document.getElementById("closesignupmodal").click()
    setsignupErrorDetails([error.response.data])
    document.getElementById("signupAlertopenbtn").click()
      console.error('Error:', error);
      
    // alert(JSON.stringify(error.response.data))
      
    }
  };
  
  // here the hasing code
  function sha256(str) {
    return cryptoJs.SHA256(str).toString();
}


function generateDeviceToken() {
  // Gather device information
  var userAgent = navigator.userAgent;
  var screenWidth = screen.width;
  var screenHeight = screen.height;
  var language = navigator.language;

  // Combine device information into a string
  var deviceInfo = userAgent + '|' + screenWidth + 'x' + screenHeight + '|' + language;

  // Use a hash function (e.g., SHA-256) to generate a unique identifier
  var hashedToken = sha256(deviceInfo); // Assuming you have a SHA-256 hashing function

  localStorage.setItem("sessionidentify",hashedToken)
  return hashedToken;
}
useEffect(() => {
  
  generateDeviceToken()
  
}, []);
  
  return (
    <div>
     <SignupAlert signupErrorDetails={signupErrorDetails}/>
      <div
        className="modal fade"
        id="signupModal"
        tabIndex="-1"
        aria-labelledby="signupModalLabel"
        aria-hidden="true"
        >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="signup-cont pb-5 px-5 rounded my-0 w-35 mt-3">
       
              <i
                className="fa fa-close float-end fs-3"
                onClick={() => closeModal()}
                id="closesignupmodal"
              >
                {" "}
              </i>
              <h1 className="signup-title pb-3 pt-1 d-flex justify-content-center">
                Sign Up
              </h1>
              <form
                className="d-flex flex-column justify-content-center px-2"
                name="signup-form"
            
                onSubmit={handleSubmit}
              >
                <label htmlFor="name">Nick Name</label>
                <input
                  className="form-control rounded-pill"
                  type="name"
                  maxLength="10"
                  minLength="3"
                  htmlFor="te"
                  name="name"
                  onChange={handleChange}
                />
                <label htmlFor="username">Username (should be unique)</label>
                <input
                  className="form-control rounded-pill"
                  type="username"
                id="username-input"
                  minLength="5"
                  maxLength="20"
                  name="username"
                  onChange={handleChange}
                />
                <label htmlFor="username">Email</label>
                <input
                  className="form-control rounded-pill"
                  type="email"
                id="email-input"
                
                  name="email"
                  onChange={handleChange}
                />
                <label htmlFor="password">Create Password</label>
                <input
                  className="form-control rounded-pill"
                  type="password"
                  minLength="8"
                  maxLength="20"
                  name="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
                <label htmlFor="confirm-password">Confirm-Password</label>
                <input
                  className="form-control rounded-pill"
                  type="password"
                  minLength="8"
                  maxLength="20"
                  name="confirmpassword"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
                <button className="mt-4 rounded fs-5">Confirm</button>
                <div
                  className="mt-2 w-100 d-flex justify-content-center btn-primary bg-transparent border-none"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  <div
                    className="btn-dark text-dark text-light border-bottom border-dark"
                    type="submit"
                  >
                    Login
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
