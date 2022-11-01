import React, {createContext, useContext, useEffect, useState} from 'react'
import request from '../util/request';
import { useAuth } from './AuthContext';

const ProjectContext = createContext({
  projects: [],
  setProjects: () => {},
  actProject: [{label: "", value: ""}],
  setActProject: () => {},
  projectTreeData: [{}],
});

export const useProject = () => useContext(ProjectContext);

const ProjectProvider = ({children}) => {
  const [projects, setProjects] = useState([]);
  const [actProject, setActProject] = useState([{label: "", value: ""}]);
  const [projectTreeData, setProjectTreeData] = useState([{}]); 
  const { user , isAuthenticated} = useAuth();

  const id = user ? user.googleId : "";

  useEffect(() => {
    const fetchProjectData = async () => {
        const project = await request.get(`/project/${id}`);
        if(project.data) {
              setProjects(project.data);
              setActProject({label: project.data[0].name, value: project.data[0]._id})
              setProjectTreeData(project.data[0].treeData);
          }
        }   
   if(isAuthenticated) {
       fetchProjectData();
   }     
  }, [isAuthenticated, id]);

  useEffect(()=> {
    const act = projects.find(project => project._id === actProject.value);
    if(act) {
        setProjectTreeData(act.treeData);
    }
  }, [actProject, projects])

  return (
    <ProjectContext.Provider value={{projects, actProject, setActProject, projectTreeData, setProjectTreeData}}>
        {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider;