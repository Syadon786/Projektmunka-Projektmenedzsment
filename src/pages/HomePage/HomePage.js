import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import { useProject } from '../../contexts/ProjectContext'
import { useAuth } from '../../contexts/AuthContext';

import Page from '../../components/Page/Page'
import ProjectUsers from '../../components/ProjectUsers/ProjectUsers';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import FormModal from '../../components/FormModal/FormModal';
import request from '../../util/request';

import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';


const HomePage = () => {
  const {actProject, fetchProjectsData} = useProject();
  const [selectedUsers, setSelectedUsers] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const {user} = useAuth();
  const navigate = useNavigate();

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

  const deleteProject = async () => {
      const res = await request.delete(`/project/${actProject.value}`);
      if(res.data === "Success") {
          fetchProjectsData();
      }
  }

  const addUsers = async () => {
    const res = await request.put(`/project/${actProject.value}/users/`, {
       emails: selectedUsers.slice(1).trim().split("@").map((act) => act.trim()+"@gmail.com")
    })
    if(res.data === "Success") {
      setSelectedUsers("");
      setRefresh(!refresh);
    }
  }
  
  return (
    <Page title="Home">
        {(Object.keys(actProject).length === 0) 
        ? 
        <div>
           <div className="card my-4 flex-fill m-2 p-4 bg-white shadow text-center">
              <p className="fs-3">You have no projects and you have not been added to any yet.</p>
              <div>
                <Button onClick={() => navigate("/new")}>Create New Project</Button>
                </div>
           </div>
        </div>
        : 
        <>
          <div className='d-flex justify-content-evenly'>
          <div className="card my-4 flex-fill m-2 p-4 bg-white shadow text-center">
              {`${actProject.label} content`}
          </div>
          <div className="card my-4 flex-fill m-2 p-4 bg-white shadow text-center">
              {`${actProject.label} content`}
          </div>
          <div className="card my-4 flex-fill m-2 p-3 bg-white shadow">
            <ProjectUsers triggerRefresh={refresh}/>
          </div>
          </div>
          <div className='d-flex justify-content-around'>
            <Button className="me-2" data-bs-toggle="modal" data-bs-target="#addUserModal">Add User</Button>
            {(actProject.owner === user.googleId) ? 
              <Button color="danger" className="me-2" data-bs-toggle="modal" data-bs-target="#deleteProjectModal">Delete Project</Button>
            : null}
          </div>


          <Modal id="deleteProjectModal" title="Are you sure?" btnColor="danger" approveText="Delete" approveFunc={deleteProject}>
            Do you really want to delete this project?
          </Modal>

          <FormModal id="addUserModal" title="Add new members to the project" approveText="Add" approveFunc={addUsers}>
            <div className="form-group mt-2">
            <label>Add members to the Project (type @)</label>
             <TextInput className="form-control"  options={users} 
              onChange={(event) => {
                console.log(event);
                setSelectedUsers(event);
              }}
              value={selectedUsers}/>
              </div>
          </FormModal>


        </>
      }

    </Page>
  )
}

export default HomePage