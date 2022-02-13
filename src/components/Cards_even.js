import React from 'react'

export default function Cards_even(props) {
  return (
    <div className="tile even">
          <div className="title">{props.title}</div>
          <div className="text">Click here to check out my resume</div>
    </div>
  )
}
