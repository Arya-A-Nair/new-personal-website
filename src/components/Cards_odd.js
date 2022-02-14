import React from 'react'

export default function Cards(props) {
  return (
  <a href={props.link} target="_blank">
    <div className="tile odd">
        <div className="title">{props.title}</div>
        <div className="text">{props.text}</div>
    </div>
  </a>
  )
}
