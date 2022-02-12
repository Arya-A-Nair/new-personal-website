import React from 'react'
import logo from "./assets/logo.png"
import Socials from "./Socials.js"


export default function LeftBar() {
  return (
    <div className="left-bar">
    
      <img src={logo} alt="Arya-img" className="arya-image"/>
      <div className="Name">Arya Nair</div>
      <a href="https://github.com/Arya-A-Nair" className="github-handle" target="_blank">@Arya-A-Nair</a>

      <div className="role">Responsive Web Development, Python, C++</div>
      <span><i className="fas fa-map-marker-alt"></i> Earth</span>
      <Socials/> 
    </div>
  )
}
