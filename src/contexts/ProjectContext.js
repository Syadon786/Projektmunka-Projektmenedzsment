import React, {createContext, useContext, useEffect, useState, useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import request from '../util/request';
import { useAuth } from './AuthContext';

const ProjectContext = createContext({
  projects: [],
  setProjects: () => {},
  actProject: [{label: "", value: ""}],
  setActProject: () => {},
  projectTreeData: [{}],
  created: false,
  isProjectLoading: true,
  setIsProjectLoading: () => {},
  setCreated: () => {},
});

export const useProject = () => useContext(ProjectContext);

const ProjectProvider = ({children}) => {
  const [projects, setProjects] = useState([]); //csak value (id) és label (name)
  const [actProject, setActProject] = useState({});
  const [projectTreeData, setProjectTreeData] = useState([{}]); 
  const [created, setCreated] = useState(false);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const { user , isAuthenticated} = useAuth();

  const id = user ? user.googleId : "";

  const fetchProjectsData = useCallback(async () => {
    const projectsData = await request.get(`/${id}/project/`);
    console.log(projectsData);
    if(projectsData.data.length > 0) {
          setProjects(projectsData.data);
          setActProject({label: projectsData.data[0].name, value: projectsData.data[0]._id})
        }
        setIsProjectLoading(false);
    }, [id]);  

  useEffect(() => {
   if(isAuthenticated) {
       fetchProjectsData();
   }     
  }, [created, isAuthenticated, id, fetchProjectsData]);

  useEffect(()=> {
    const fetchProjectData = async () => {
      const projectData = await request.get(`/project/${actProject.value}`)
      if(projectData.data) {
        setProjectTreeData(projectData.data.treeData);
      }
    }
    fetchProjectData();
  }, [actProject, projects])

  return (
    <ProjectContext.Provider value={{projects, isProjectLoading, actProject, setActProject, projectTreeData, setProjectTreeData, setCreated}}>
        {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider;