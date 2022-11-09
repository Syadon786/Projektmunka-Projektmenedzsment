import React, {useState, useEffect} from 'react'
import request from '../../util/request';
import { useProject } from '../../contexts/ProjectContext'

import ProjectUser from '../ProjectUser/ProjectUser';
import { useCallback } from 'react';

const ProjectUsers = ({triggerRefresh}) => {
  const {actProject} = useProject();
  const [projectUsers, setProjectUsers] = useState([]);

  const fetchProjectUsers = useCallback(async () => {
    const res = await request.get(`/project/${actProject.value}/users`);
    if(res.data) {
      setProjectUsers(res.data);
    }
  }, [actProject.value])

  useEffect(() => {
    fetchProjectUsers();
  }, [actProject.value, fetchProjectUsers, triggerRefresh]);

  return (
    <div>
    <p className='fs-4'>Project users: </p>
    <table className="table">
        <tbody>
            {projectUsers.map(user => {
                return <ProjectUser key={user._id} id={user._id} name={user.name} email={user.email} photo={user.photo} updateUsers={fetchProjectUsers}/>
            })}
        </tbody>
    </table>
  </div>
  )
}

export default ProjectUsers