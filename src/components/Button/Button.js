import React from 'react'
import PropTypes from 'prop-types'

const Button = ({children, color = "primary", ...props}) => {
  return (
    <button className={`btn 
        ${color === "primary" ? "btn-primary" : ""}
        ${color === "secondary" ? "btn-secondary" : ""}
        ${color === "danger" ? "btn-danger" : ""}
    `}
    {...props}
    >
    {children}
    </button>
  )
}

Button.propTypes = {
    color: PropTypes.string,
}

export default Button;