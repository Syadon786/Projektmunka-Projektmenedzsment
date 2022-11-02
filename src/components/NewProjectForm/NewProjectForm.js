import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProject } from '../../contexts/ProjectContext';
import request from '../../util/request';
import Button from '../Button/Button'

const NewProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const {setCreated} = useProject();

  const handleSubmit = (event) => {
    event.preventDefault();
    const sendNewProjectData = async () => {
        const res = await request.post("/project", {
            name: projectName,
            owner: user.googleId,
            treeData: [ { title: projectName, root: true,  children: [], expanded: false}],
            users: [user.googleId]    
        });
        console.log(res);
        if(res.data === "Success") {
          setCreated((prev) => !prev)
          navigate("/home")
      };
    }   
    sendNewProjectData();
  }

  return (
    <form className="col-md-9 go-right" onSubmit={handleSubmit}>
			<h2>Create New Project</h2>
			<div className="form-group">
			<label >Project Name</label>
			<input type="text" 
                value={projectName} 
                onChange={(event) => setProjectName(event.target.value)} 
                className="form-control" required/>
		</div>
		<div className="form-group mt-2">
			<label>Add members to the Project (in progress)</label>
			<textarea className="form-control"></textarea>
		</div>
        <Button type="submit" className="mt-3">Submit</Button>
	</form>
  )
}

export default NewProjectForm