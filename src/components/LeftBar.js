import React from 'react'



export default function LeftBar() {
  return (
    <div className="left-bar">
      <img src="https://picsum.photos/200" alt="Arya-img" className="arya-image"/>
      <div className="Name">Arya Nair</div>
      <a href="https://github.com/Arya-A-Nair" className="github-handle">@Arya-A-Nair</a>

      <div className="role">Python, C, C++, Web Development</div>
      <span><i className="fas fa-map-marker-alt"></i> Earth</span>
      <div className="socials">
        <div className="social-icon">
          <a href="https://www.linkedin.com/in/arya-nair-2003/" target="_blank" class="socials"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <div className="social-icon">
          <a href="mailto: aryaajitnair@gmail.com"><i class="fa-solid fa-envelope"></i></a>
        </div>
        <div className="social-icon">
          <a href="https://github.com/Arya-A-Nair"><i class="fa-brands fa-github"></i></a>
        </div>
      </div>
    
      
    </div>
  )
}
