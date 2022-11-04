import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { useProject } from '../../contexts/ProjectContext';
import request from '../../util/request';

import "./ProjectUser.css";

const ProjectUser = ({id, photo, name, email, updateUsers}) => {
  const {user} = useAuth();
  const {actProject} = useProject();

  const deleteUserFromProject = async () => {
      const res = await request.delete(`/project/${actProject.value}/users/${id}`);
      if(res.data === "Success") {
          updateUsers();
      }
  }

  return (
    <tr>
        <td><img className="homepage-user-img" src={photo} alt={`${name}`}/></td>
        <td>{email}</td>
        <td>{name}</td>
        {((user.googleId  === id) || id === actProject.owner) ? null
        :
        <td><button onClick={() => {
          deleteUserFromProject();
        }}><i className="bi bi-x-circle"></i></button></td>
        }         
    </tr>
  )
}

export default ProjectUser