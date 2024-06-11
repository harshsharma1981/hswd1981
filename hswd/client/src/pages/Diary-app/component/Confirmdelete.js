import React from 'react'

function Confirmdelete({deleteDiary}) {
  return (
    <div>
  



<div className="modal fade" id="confirmdeleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">HSWD</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Are You Sure To Want To Delete This Diary
      </div>
      <div className="modal-footer">
        <button type="button" id="wClose" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <div  className="btn btn-primary" data-bs-dismiss="modal"  onClick={()=>deleteDiary(localStorage.getItem("diaryId"))}>Sure</div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Confirmdelete