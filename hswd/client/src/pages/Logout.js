import React, { useEffect } from 'react'
import { useAuth } from '../Store/auth';
import { Navigate } from 'react-router-dom';

const Logout = () => {
const {LogoutUser}=useAuth()
useEffect(() => {
    LogoutUser()
}, [LogoutUser]);
return <Navigate to="/" />
  
}

export default Logout
