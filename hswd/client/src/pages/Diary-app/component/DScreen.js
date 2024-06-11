import React from 'react'

function DScreen({handleSave,handleChangediary}) {
const cancel=()=>{
  document.getElementById("dscreen").style.display="none"
  document.getElementById("dscreen-text").style.display="flex"
  
  document.getElementById("sidebar").style.display="block"

  if (window.innerWidth<769) {
  document.getElementById("dscreen-text").style.display="none"
  }
  localStorage.removeItem("diaryId")
}

  return (
    
    <div className="form-floating w-77  flex-column " id='dscreen' style={{height:"91vh"}}>
    <div className="d-grid gap-2 d-md-block px-2">
  <button className="btn btn-danger float-start" onClick={()=>cancel()} type="button">Cancel</button>
  <button className="btn btn-success float-end" id='dSave' onClick={handleSave} type="button">Save</button>
</div>
<div className="input-group flex-nowrap">
  
  <input name='title' onChange={handleChangediary} type="text" className="form-control fs-4 title" placeholder="Title" id='title' aria-label="Username" defaultValue={""} aria-describedby="addon-wrapping"/>
  <div type="button" className="ps-4 d-flex align-items-center bg-none" data-bs-toggle="modal" data-bs-target="#confirmdeleteModal">
  <div className='d-flex align-items-center'><i className="fa fa-trash-o fs-3 pe-4" ></i></div>

</div>
</div>
<div className="input-group flex-nowrap">
  
  <input  type="text" id='date' className="form-control fs-6 title" value={new Date().toDateString()} disabled aria-label="Username" aria-describedby="addon-wrapping"/>
</div>
  <textarea name='diary' onChange={handleChangediary} className="h-86 text-editor   ps-3" rows={50} defaultValue={"Type Something..."} id="floatingTextarea2" ></textarea>
  <input type="hidden" id="diaryId" name="diaryId" value="false"/>

</div>
 
  )
}

export default DScreen