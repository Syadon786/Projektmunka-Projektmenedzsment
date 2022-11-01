import React from 'react'
import { useProject } from '../../contexts/ProjectContext';

import "./Select.css"; 

const Select = ({ disabled = false, readonly = false}) => {
  const {projects, setActProject } = useProject();
  console.log(projects);
  return (
    <div className="selector-holder">
        <select
          disabled={disabled}
          readOnly={readonly}
          onChange={({target}) => {
            setActProject({value: target.value, label: target.selectedOptions[0].label})
            console.log(target.selectedOptions[0].label);  
          }}>

        {projects.map(({name, _id}) => <option key={_id} value={_id} label={name}/>)}
      </select>
        
    </div>
  )
}

export default Select