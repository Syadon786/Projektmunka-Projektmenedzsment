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

import { PieChart } from 'react-minimal-pie-chart';
import "./HomePage.css";


const HomePage = () => {
  const {actProject, fetchProjectsData, progressMap, tasks, setRefreshProgress} = useProject();
  const [selectedUsers, setSelectedUsers] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const {user} = useAuth();
  const [chartValues, setChartValues] = useState([]);
  const [selected, setSelected] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
        const res = await request.post('/users', {
            owner : user.googleId
        })
        if(res.data) {
          setUsers(res.data.map((act) => act.email.split('@')[0]));
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

  useEffect(() => {
    setRefreshProgress(prev => !prev);
  }, [setRefreshProgress])

  useEffect(() => {
    if(progressMap.length > 0 && tasks.length > 0) {
      const tasksCount = tasks.length;
      let completedCount = 0; 
      let lateCount = 0;
      progressMap.forEach(progress => {
        if(progress.progress === 100) {
          completedCount += 1;
        }
      });
      tasks.forEach(task => {
         if(new Date(task.endDate) <= new Date() && 
         progressMap.filter(progress => progress.id === task._id && progress.progress === 100).length === 0) {
           lateCount += 1;
         }
      })
      console.log(progressMap);
      setChartValues([tasksCount - completedCount - lateCount, completedCount, lateCount]);
    }
  }, [progressMap, tasks])
  
  return (
    <Page title="Home" noCard className="page-container page-width">
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
          <div className="row justify-content-center p-4">
          <div className="col-lg-6 col-md-10 col-sm-10 card my-4 p-4 bg-white shadow text-center">
            <div>
            {chartValues.length > 0 ? 
            <>
              <p className='fs-5' style={{position: "absolute"}}>Task Statistics: </p>
              <PieChart  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`} 
              lineWidth={60}
              labelPosition={100 - 60 / 2}
              viewBoxSize={[100, 100]}
              labelStyle={{
                fill: '#fff',
                opacity: 0.75,
                fontSize: '0.5rem',
                pointerEvents: 'none',
              }}
              style={{ overflow: "visible", width: "90%"}}
              segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
              segmentsShift={(index) => (index === selected ? 6 : 1)}
              animate
              onClick={(_, index) => {
                setSelected(index === selected ? undefined : index);
              }}
                  data={[
                    { title: 'Completed', value: chartValues[1], color: '#379237' },
                    { title: 'Ran out of time', value: chartValues[2], color: '#b82828' },
                    { title: 'In Progress', value: chartValues[0], color: '#3e97c7' },
                  ]}
                />
            </>
            : 
            <></>}  
            </div>
          </div>
          <div className="col-lg-5 col-md-10 ms-lg-4 col-sm-10 card my-4 p-4 bg-white shadow text-center">
            <ProjectUsers triggerRefresh={refresh}/>
          </div>
          <div className="col-lg-11 col-md-9 col-sm-10 card p-4 bg-white shadow text-center">
            <div className='d-flex justify-content-around'>
              <Button className="me-2" data-bs-toggle="modal" data-bs-target="#addUserModal">Add User</Button>
              {(actProject.owner === user.googleId) ? 
                <Button color="danger" className="me-2" data-bs-toggle="modal" data-bs-target="#deleteProjectModal">Delete Project</Button>
              : null}
            </div>
          </div>
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