import React from 'react'
import PropTypes from 'prop-types'

const Button = ({children, color = "primary", className, ...props}) => {
  const BtnConfig = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    dark: "btn-dark",
    darkOutline: "btn-outline-dark",
    outline: "btn-outline-primary"
  }

  return (
    <button className={`btn ${BtnConfig[color]} ${className}`}
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