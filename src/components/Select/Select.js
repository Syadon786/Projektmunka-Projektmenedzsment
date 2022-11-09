import React from 'react'
import { useProject } from '../../contexts/ProjectContext';

import "./Select.css"; 

const Select = ({ disabled = false, readonly = false}) => {
  const {projects, setActProject } = useProject();
  return (
    <div className="selector-holder">
        <select
          disabled={disabled}
          readOnly={readonly}
          onChange={({target}) => {
            const owner = projects.find((project) => project._id === target.value).owner;
            setActProject({value: target.value, label: target.selectedOptions[0].label, owner: owner})
          }}>

        {projects.map(({name, _id}) => <option key={_id} value={_id} label={name}/>)}
      </select>
        
    </div>
  )
}

export default Select