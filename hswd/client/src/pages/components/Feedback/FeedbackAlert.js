import React from 'react'

const FeedbackAlert = ({feedbackErrorDetails}) => {

  return (
    <div>
      <button type="button" id='feedbackAlertopenbtn' className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#feedbackAlertopen">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="feedbackAlertopen" tabIndex="-1" aria-labelledby="feedbackAlertopen" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
  {feedbackErrorDetails&&feedbackErrorDetails.map((e)=> e.error?(
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Feedback Failed</h5>
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
          <h5 className="modal-title" id="exampleModalLabel">Feedback Successful</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
       
        <div>{e.ok}</div>
      
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

export default FeedbackAlert
