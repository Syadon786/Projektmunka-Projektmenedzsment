import React from 'react'
import PropTypes from 'prop-types'

const Button = ({children, color = "primary", ...props}) => {
  const BtnConfig = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    dark: "btn-dark",
    darkOutline: "btn-outline-dark"
  }

  return (
    <button className={`btn ${BtnConfig[color]}`}
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