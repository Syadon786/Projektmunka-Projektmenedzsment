import React, {useState, useEffect, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProjectTree from './pages/ProjectTree/ProjectTree';
import LoginPage from './pages/LoginPage/LoginPage';

import "./App.css";
import SideMenu from './components/SideMenu/SideMenu';

import { ProjectContext } from './contexts/ProjectContext';
import {userContext} from './contexts/UserContext';

const App = () => {
  const [actProject, setActProject] = useState({value: "#0123", label: "Project"});
  const user = useContext(userContext);
  console.log(user);

  useEffect(() => {
    console.log(actProject);
  }, [actProject]) 

  return (
    <div className="App"> 
    <Router>
    <header className="App-header">
      <ProjectContext.Provider value={setActProject}>
          <SideMenu/>
      </ProjectContext.Provider>
    </header>
    <div className="content">
      <Routes>
        <Route path="/home" element={<HomePage actProject={actProject}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tree" element={<ProjectTree actProject={actProject}/>} />
        <Route path="/notfound" element={<NotFoundPage />} />

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </div>
    </Router>
  </div>
  )
}

export default App