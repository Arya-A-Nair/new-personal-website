import React from 'react'

export default function Cards_even(props) {
  return (
    <a href={props.link} target="_blank">
    <div className="tile even">
        <div className="title">{props.title}</div>
        <div className="text">{props.text}</div>
    </div>
  </a>
  )
}
