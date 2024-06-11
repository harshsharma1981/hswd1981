import React, { useState } from "react";
import "./components-css/login.css";
import axios from "axios";
import { useAuth } from "../Store/auth";
import { Navigate, redirect, useNavigate } from "react-router-dom";

import LoginAlert from "./components/Signup/LoginAlert copy";
const Login = ({ closeModal }) => {
const navigate = useNavigate()

const {StoreTokenInLs,curl,LoginStatus} =useAuth()
const [loginErrorDetails,setloginErrorDetails]=useState()
  const [LoginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    document.getElementById("username-input2").value=document.getElementById("username-input2").value.toLowerCase()

    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend API endpoint
      
    
      if (LoginData.username!==""&&LoginData!=="") {
        
      
      const response = await axios.post(
        `${curl}/api/login`,
        LoginData
      );
    
      const res_data = await response.data;
     
      if (res_data.token!==undefined) {
        
        StoreTokenInLs(res_data.token)
        //Reset form after successful submission
        setLoginData({
          username: "",
          password: "",
        });
        LoginStatus()
        document.getElementById("closeloginModal").click()
      setloginErrorDetails([res_data])
      document.getElementById("loginAlertopenbtn").click()
       navigate("/")
      }}
      else{
      alert("invailed")
      }
    } catch (error) {
      document.getElementById("closeloginModal").click()
    setloginErrorDetails([error.response.data])
    document.getElementById("loginAlertopenbtn").click()
      
    }
  };
  return (
    <div>
    <LoginAlert loginErrorDetails={loginErrorDetails}/>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="login-cont pb-5 rounded my-2 px-5">
              <i
                className="fa fa-close float-end fs-3"
                id="closeloginModal"
                onClick={() => closeModal()}
              >
                {" "}
              </i>
              <h1 className="login-title pb-5 pt-5 d-flex justify-content-center">
                Sign In{" "}
              </h1>
              <form
                className="d-flex flex-column"
                onSubmit={handleSubmit}
                name="signin-form"
            
              >
                <label htmlFor="username" auto="auto">
                  Username
                </label>
                <input
                id="username-input2"
                  className="form-control rounded-pill"
                  onChange={handleChange}
                  type="username"
                  minLength="5s"
                  name="username"
                />
                <label htmlFor="password"> Password</label>
                <input
                  className="form-control rounded-pill"
                  onChange={handleChange}
                  type="password"
                  minLength="8"
                  name="password"
                  autoComplete="new-password"
                />
                <button className="mt-4 rounded fs-5">confirm</button>
                <div
                  className="mt-2 w-100 d-flex justify-content-center btn-primary bg-transparent border-none"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#signupModal"
                >
                  <div
                    className="btn-dark text-dark text-light border-bottom border-dark"
                    type="submit"
                  >
                    Signup
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <script src="javascripts/login.js"></script>
    </div>
  );
};

export default Login;
