import React, {useState} from 'react'
import Button from '../Button/Button'

const NewProjectForm = () => {
  const [projectName, setProjectName] = useState();

  return (
    <form className="col-md-9 go-right">
			<h2>Create New Project</h2>
			<div className="form-group">
			<label >Project Name</label>
			<input type="text" 
                value={projectName} 
                onChange={(event) => setProjectName(event.target.value)} 
                className="form-control" required/>
		</div>
		<div className="form-group">
			<label>Add members to the Project (in progress)</label>
			<textarea className="form-control"></textarea>
		</div>
        <Button className="mt-3">Submit</Button>
	</form>
  )
}

export default NewProjectForm