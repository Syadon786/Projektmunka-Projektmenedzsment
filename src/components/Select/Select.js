import React from 'react'

import "./Select.css"; 

const Select = ({ values, callback, disabled = false, readonly = false, selected }) => {
  return (
    <div className="selector-holder">
        <select
              disabled={disabled}
              readOnly={readonly}
              onChange={({target}) => {
                callback({value: target.value, label: target.selectedOptions[0].label})
                console.log(target.selectedOptions[0].label);  
              }}              
        >
            {values.map(({value, label}) => <option key={value} value={value} label={label}/>)}
        </select>         
    </div>
  )
}

export default Select