import React from 'react';
import Cards from './Cards.js';
import {resume,certifications,works} from './assets/data';

export default function RightBar() {
  return (
    <div className="right-bar">
      <div className="rightbar-text">Guten</div>
      <div className="rightbar-text">Tag!</div>
      <div className="content">
        {resume.map((data)=>{
          return <Cards key={data.id} data={data}/>
        })}
      </div>



      <div className="rightbar-text">Certifications</div>
      <div className="content">
      {certifications.map((data)=>{
          return <Cards key={data.id} data={data}/>
        })}
      </div>



      <div className="rightbar-text">Works</div> 
      <div className="content">
      {works.map((data)=>{
          return <Cards key={data.id} data={data}/>
        })}
      </div>
      
      <div className="rightbar-bottom">And many more yet to come . . .</div> 
    </div>
  )
}
