import React from 'react';
import Cards_odd from './Cards_odd.js';
import Cards_even from './Cards_even.js';

export default function RightBar() {
  return (
    <div className="right-bar">
      <div className="rightbar-text">Guten Tag!</div>
      <div className="content">
        <Cards_odd title="Arya" />
        <Cards_even title="Resume"/>
        <Cards_odd title="Arya"/>
        <Cards_even title="Resume"/>
        <Cards_odd title="Arya"/>
        <Cards_even title="Resume"/>
        <Cards_odd title="Arya"/>
        <Cards_even title="Resume"/>
      </div>
      
      
    </div>
  )
}
