import React from 'react'
import { ProjectContext } from '../../contexts/ProjectContext';

import "./Select.css"; 

const Select = ({ values, disabled = false, readonly = false, selected }) => {
  return (
    <div className="selector-holder">
       <ProjectContext.Consumer>
        {(setActProject) => 
            <select
            disabled={disabled}
            readOnly={readonly}
            onChange={({target}) => {
              setActProject({value: target.value, label: target.selectedOptions[0].label})
              console.log(target.selectedOptions[0].label);  
            }}>

          {values.map(({value, label}) => <option key={value} value={value} label={label}/>)}
        </select>
        }
        </ProjectContext.Consumer>         
    </div>
  )
}

export default Select