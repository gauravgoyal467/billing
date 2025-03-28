import React from 'react'
import './style.css'

const Button = ({text,outlined}) => {
  return (
    <div className={outlined ? "outlined-btn" : "btn"}>{text}</div>
  )
}

export default Button