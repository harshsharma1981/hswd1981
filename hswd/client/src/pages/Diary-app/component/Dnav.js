import React from 'react'

function Dnav({searchDiary,addDiary}) {
  return (
    <div>
     <nav className="navbar navbar-light bg-light">
  <form className="container-fluid">
    <div className="input-group">
      <span className="input-group-text" id="basic-addon1">HSWD</span>
      <input type="text" name='search' defaultValue={""} className="form-control" onChange={searchDiary} placeholder="Search For Diary with title or diary content" aria-label="Username" aria-describedby="basic-addon1"/>
  <div className="rounded-circle add-button ms-1 fs-1 color-black " onClick={addDiary}><i className="fa fa-plus d-flex justify-content-center align-items-center"></i></div>
    </div>
  </form>

</nav>
    </div>
  )
}

export default Dnav