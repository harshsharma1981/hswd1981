import React from 'react'

const SignupAlert = ({signupErrorDetails}) => {
  return (
    <div>
      <button type="button" id='signupAlertopenbtn' className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#signupAlertopen">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="signupAlertopen" tabIndex="-1" aria-labelledby="signupAlertopen" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
  {signupErrorDetails&&signupErrorDetails.map((e)=> e.error?(
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Signup Failed</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
     
      <div>{e.error}</div>
    
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
        
      </div>
    </div>
      ):(
        <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Signup Successful</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
       
        <div>{e.success}</div>
      
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
          
        </div>
      </div>))}
  </div>
</div>
    </div>
  )
}

export default SignupAlert
