import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProject } from '../../contexts/ProjectContext';

import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

import request from '../../util/request';
import Button from '../Button/Button'


const NewProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState("");
  const navigate = useNavigate();
  const {setCreated} = useProject();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const sendNewProjectData = async () => {
        const res = await request.post("/project", {
            name: projectName,
            owner: user.googleId,
            treeData: [ { title: projectName, root: true,  children: [], expanded: false}],
            users: [user.googleId, ...(selectedUsers.slice(1).trim().split("@").map((act) => act.trim()+"@gmail.com"))]    
        });
        console.log(res);
        if(res.data === "Success") {
          setCreated((prev) => !prev)
          navigate("/home")
      };
    }   
    sendNewProjectData();
  }

  useEffect(() => {
    const fetchUsers = async () => {
        const res = await request.post('/users', {
            owner : user.googleId
        })
        if(res.data) {
          setUsers(res.data.map((act) => act.email.split('@')[0]));
          console.log(res.data)
        }
    };
    fetchUsers();
  }, [user.googleId]);

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
			<label>Add members to the Project (type @)</label>
			<TextInput className="form-control"  options={users} 
      onChange={(event) => {
        console.log(event);
        setSelectedUsers(event);
      }}
      value={selectedUsers}/>
		</div>
        <Button type="submit" className="mt-3">Submit</Button>
	</form>
  )
}

export default NewProjectForm