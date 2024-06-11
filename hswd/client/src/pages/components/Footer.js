import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container-fluid d-flex justify-content-center align-items-center main-footer-cont flex-column " id="footer">
  <div className="container-xl d-flex justify-content-center align-items-center pt-5"><a className="btn btn-light rounded-circle fs-4 bg-transparent" href="https://www.instagram.com/harsh._.1981?utm_source=qr&amp;igsh=MnFxYwbWdjYnN3" id="instagram"><i className="fa fa-instagram"></i></a></div>
  <div>
    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row py-3">
      <li className="nav-item px-2"><a className="nav-link active" aria-current="page" href="#">Home</a></li>
      <li className="nav-item px-2"><a className="nav-link" href="#about">About</a></li>
      <li className="nav-item px-2"><a className="nav-link" href="#latestcont">Projects</a></li>
      <li className="nav-item px-2"><a className="nav-link" href="/feedback">Feedback</a></li>
      <li className="nav-item px-2"><a className="nav-link" href="/hchat">HCHAT</a></li>
    </ul>
  </div>
  <div className="container-xl d-flex justify-content-center align-items-center">
    <p className="text-font">Thank you for visiting © Harsh All rights reserved.</p>
  </div>
</div>
    </div>
  )
}

export default Footer
