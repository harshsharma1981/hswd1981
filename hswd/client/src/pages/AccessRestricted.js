import React from 'react'
import { Link } from 'react-router-dom'

const AccessRestricted = () => {
  return (
    <div className="text-light d-flex flex-column justify-content-center align-items-center" style={{height:"100vh"}}><div className="d-flex  justify-content-center"> <div className="card">

    <div className="card-body">
      <h5 className="card-title">Access Restricted</h5>
      <p className="card-text">You Have To Login Before Using HChat App </p>
      <Link to="/" className="btn btn-dark">Okay</Link>
    </div>
  </div></div> </div>
  )
}

export default AccessRestricted
