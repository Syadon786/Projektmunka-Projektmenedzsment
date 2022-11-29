import React, {createContext, useContext, useEffect, useState, useCallback} from 'react'
import request from '../util/request';
import { walk } from 'react-sortable-tree';
import { useAuth } from './AuthContext';

const ProjectContext = createContext({
  projects: [],
  setProjects: () => {},
  actProject: false,
  setActProject: () => {},
  fetchProjectsData: () => {},
  projectTreeData: [{}],
  tasks: [],
  progressMap: [],
  created: false,
  setCreated: () => {},
  setRefreshProgress: () => {}
});

export const useProject = () => useContext(ProjectContext);

const ProjectProvider = ({children}) => {
  const [projects, setProjects] = useState([]); //csak value (id) és label (name)
  const [actProject, setActProject] = useState(false);
  const [projectTreeData, setProjectTreeData] = useState([{}]); 
  const [created, setCreated] = useState(false);
  const { user , isAuthenticated} = useAuth();

  const id = user ? user.googleId : "";

  const [tasks, setTasks] = useState([]);
  const [descendantMap, setDescendantMap] = useState([]);
  const [progressMap, setProgressMap] = useState([]);
  const [refreshProgress, setRefreshProgress] = useState(false);

  useEffect(() => {
      if(Object.keys(projectTreeData[0]).length > 0 && actProject) {
          const desMap = [];
          const getNodeKey = ({ treeIndex }) => treeIndex;
          const fetchTasks = async () => {
              const res = await request.get(`${actProject.value}/task/`)
              if(res.data !== "Failure") {
                  setTasks(res.data);
              }
          };
          fetchTasks();
          walk({treeData: projectTreeData, getNodeKey: getNodeKey, ignoreCollapsed: false,
              callback: rowInfo => {
                  if(!rowInfo.node?.root) {
                      let descendantIds = [];
                      walk({treeData: rowInfo.node?.children, getNodeKey: getNodeKey, ignoreCollapsed: false, callback: (dInfo) => {
                          descendantIds.push(dInfo.node.taskId);
                      }})
                      desMap.push({id: rowInfo.node.taskId, 
                         descendants: descendantIds})  
                  } 
              }
          })
          setDescendantMap(desMap);
      }
  }, [actProject, projectTreeData, refreshProgress]);

  useEffect(() => {
      if(descendantMap.length > 0 && tasks.length > 0) {
          setProgressMap([...descendantMap.map(task => {
              let todo = 0;
              let completed = 0;
              const actTask = tasks.find(ts => ts._id === task.id);
              todo += actTask?.subtasks.length - actTask?.completedTasks.filter(isCompleted => isCompleted.completed).length;
              completed += actTask?.completedTasks.filter(isCompleted => isCompleted.completed).length;
              if(task.descendants.length > 0) {
                  task.descendants.forEach(des => {
                      const descendantTask = tasks.find(ts => ts._id === des);
                      todo += descendantTask?.subtasks.length - descendantTask?.completedTasks.filter(isCompleted => isCompleted.completed).length
                      completed += descendantTask?.completedTasks.filter(isCompleted => isCompleted.completed).length;
                  })
              }    
              return {id: task.id, progress: completed / (completed + todo) * 100};
          })])
      }
  }, [descendantMap, tasks])

  const fetchProjectsData = useCallback(async () => {
    const projectsData = await request.get(`/${id}/project/`);
    console.log(projectsData);
    if(projectsData.data.length > 0) {
          setProjects(projectsData.data);
          setActProject({label: projectsData.data[0].name, value: projectsData.data[0]._id, owner: projectsData.data[0].owner})
        }
      else {
        setActProject({});
      }
    }, [id]);  

  useEffect(() => {
   if(isAuthenticated) {
       fetchProjectsData();
   }      
  }, [created, isAuthenticated, id, fetchProjectsData]);

  useEffect(()=> {
    const fetchProjectTreeData = async () => {
      const projectData = await request.get(`/project/${actProject.value}`)
      if(projectData.data) {
        setProjectTreeData(projectData.data.treeData);
      }
    }
    if(isAuthenticated && actProject.value) {
      fetchProjectTreeData();
    }
  }, [actProject, projects, isAuthenticated])

  return (
    <ProjectContext.Provider value={{projects, actProject, setActProject, projectTreeData, 
    fetchProjectsData, setProjectTreeData, setCreated, progressMap, tasks, setRefreshProgress}}>
        {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider;