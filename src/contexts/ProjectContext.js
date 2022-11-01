import React, {createContext, useContext, useEffect, useState, useCallback} from 'react'
import request from '../util/request';
import { useAuth } from './AuthContext';

const ProjectContext = createContext({
  projects: [],
  setProjects: () => {},
  actProject: [{label: "", value: ""}],
  setActProject: () => {},
  projectTreeData: [{}],
  created: false,
  setCreated: () => {},
});

export const useProject = () => useContext(ProjectContext);

const ProjectProvider = ({children}) => {
  const [projects, setProjects] = useState([]);
  const [actProject, setActProject] = useState([]);
  const [projectTreeData, setProjectTreeData] = useState([{}]); 
  const [created, setCreated] = useState(false);
  const { user , isAuthenticated} = useAuth();

  const id = user ? user.googleId : "";

  const fetchProjectData = useCallback(async () => {
    const project = await request.get(`/project/${id}`);
    console.log(project);
    if(project.data.length > 0) {
          setProjects(project.data);
          setActProject({label: project.data[0].name, value: project.data[0]._id})
          setProjectTreeData(project.data[0].treeData);
      }
    }, [id]);  

  useEffect(() => {
   if(isAuthenticated) {
       fetchProjectData();
   }     
  }, [created, isAuthenticated, id, fetchProjectData]);

  useEffect(()=> {
    const act = projects.find(project => project._id === actProject.value);
    if(act) {
        setProjectTreeData(act.treeData);
    }
  }, [actProject, projects])

  return (
    <ProjectContext.Provider value={{projects, actProject, setActProject, projectTreeData, setProjectTreeData, setCreated}}>
        {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider;