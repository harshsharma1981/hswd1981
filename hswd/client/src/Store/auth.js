import { error } from "jquery";
import { createContext, useContext, useEffect, useState } from "react";
import Logout from "../pages/Logout";
import axios from "axios";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
const [token, settoken] = useState(localStorage.getItem('hswd'));
const [mychatdetailData,setmychatdetailData]=useState({})
const [isLoggedIn, setIsLoggedIn] = useState(!!token);
const [email, setemail] = useState("");
const [uName, setuName] = useState("");
const curl="https://hswd1981-1.onrender.com/"
useEffect(()=>{

  const exptokenString = localStorage.getItem('exp');
  if (!exptokenString) return null;

  const exptoken = JSON.parse(exptokenString);
  // Check if token has expired
  if (exptoken && Date.now() > exptoken) {
    LogoutUser()
    return null;
  }
},[])
useEffect(() => {
  mychatdetail();
}, [isLoggedIn]);
const mychatdetail = async () => {

  try {
  if (isLoggedIn) {
    
    const response = await axios.get(
    `${curl}/api/mychatdetails`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    setmychatdetailData(response.data)
    localStorage.setItem("username",response.data.username)
    setemail(response.data.email)
    setuName(response.data.name)
   console.log(response.data)
  }
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

  const StoreTokenInLs = (ServerToken) => {
    const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() +4320); // Expires in 3 days
  localStorage.setItem('exp',expiration.getTime());

    return (localStorage.setItem("hswd",ServerToken)
    )
  };
  const LoginStatus=async()=>{
const t2=localStorage.getItem("hswd")
settoken(t2)
    setIsLoggedIn(!!t2)
  }
  const LogoutUser =()=>{
  settoken("")
  setIsLoggedIn(false)
  localStorage.removeItem('exp'); // Remove the expired token
  
    return localStorage.removeItem("hswd")
    }

  return (
    <AuthContext.Provider value={{LoginStatus,curl,token,mychatdetailData,isLoggedIn,StoreTokenInLs,LogoutUser,email,uName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new error("useAuth used outside of povider");
  }
  return authContextValue;
};
