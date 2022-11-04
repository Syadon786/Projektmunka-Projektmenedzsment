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
            setActProject({value: target.value, label: target.selectedOptions[0].label, owner: target.selectedOptions[0].getAttribute('owner')})
          }}>

        {projects.map(({name, _id, owner}) => <option key={_id} value={_id} label={name} owner={owner}/>)}
      </select>
        
    </div>
  )
}

export default Select