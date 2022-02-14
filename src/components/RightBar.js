import React from 'react';
import Cards_odd from './Cards_odd.js';
import Cards_even from './Cards_even.js';

export default function RightBar() {
  return (
    <div className="right-bar">
      <div className="rightbar-text">Guten</div>
      <div className="rightbar-text">Tag!</div>
      <div className="content">
        <Cards_odd title="Resume" text="Click here to checkout my Resume" link="https://drive.google.com/file/d/1i-Yktw_0ykju4IXOYsIVmd9lzxgE1zdY/view?usp=sharing"/>
      </div>



      <div className="rightbar-text">Certifications</div>
      <div className="content">
        <Cards_even title="Python For Data Science" text="Certificate by IBM" link="https://www.credly.com/badges/3ce53246-2cd2-4245-a5ce-9e95e731b637?source=linked_in_profile"/>
        <Cards_odd title="Scientific Computing with Python" text="Certificate by freecodecamp" link="https://www.freecodecamp.org/certification/arya-nair/scientific-computing-with-python-v7"/>
        <Cards_even title="Responsive Web Design" text="Certificate by freecodecamp" link="https://www.freecodecamp.org/certification/arya-nair/responsive-web-design"/>
        <Cards_odd title="Javascript DSA" text="Certificate by freecodecamp" link="https://www.freecodecamp.org/certification/arya-nair/javascript-algorithms-and-data-structures"/>
      </div>



      <div className="rightbar-text">Works</div> 
      <div className="content">
        <Cards_even title="Old Personal Website" text="This project links to my old personal website" link="https://arya-a-nair.github.io/Personal-Website/"/>
        <Cards_odd title="Face Detection" text="Python project to Detect movement" link="https://github.com/Arya-A-Nair/Face-Detection"/>
        <Cards_even title="Pratherium" text="Simple Bootstrap website made for a friend" link="https://github.com/Arya-A-Nair/Pratherium"/>
        <Cards_odd title="Dictionary" text="Python CLI dictionary" link="https://github.com/Arya-A-Nair/Dictionary"/>
        <Cards_even title="Text-Spammer" text="Fun text spammer using pyautogui" link="https://github.com/Arya-A-Nair/TEXT-SPAMMER"/>
        <Cards_odd title="Product Page" text="Simple Product Page" link="https://github.com/Arya-A-Nair/Product-page"/>
        <Cards_even title="Flappy Bird Lite" text="My version of Flappy Bird" link="https://github.com/Arya-A-Nair/Flappy-cube"/>
        <Cards_odd title="Ping Pong" text="Simple Ping pong game using JS" link="https://github.com/Arya-A-Nair/Ping-Pong"/>
      </div>
      
      <div className="rightbar-bottom">And many more yet to come...</div> 
    </div>
  )
}
