import React from 'react'
import "../../components-css/HomeComponentCss/MainSection.css"
import { useAuth } from '../../../Store/auth'
const MainSection = () => {
const {mychatdetailData,isLoggedIn}=useAuth()
  return (
    <div>
      <div className="container-fluid main-section-cont py-5 d-flex justify-content-center">
      <div className="intro py-5 my-5 ">
      
 <h3 className='d-flex flex-row rounded-pill welcome py-1 px-2'>Welcome <header className='text-aqua px-2 fs-3 text-info'>{isLoggedIn&&mychatdetailData.name}</header>
 </h3>
 <h4 className='rounded-pill welcome p-2'>To HSWD Explore My Creation.</h4>
      </div>
</div>
    </div>
  )
}

export default MainSection
