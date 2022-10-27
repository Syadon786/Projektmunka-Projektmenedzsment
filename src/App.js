import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProjectTree from './pages/ProjectTree/ProjectTree';
import LoginPage from './pages/LoginPage/LoginPage';

import "./App.css";
import SideMenu from './components/SideMenu/SideMenu';

const App = () => {
  const [actProject, setActProject] = useState({value: "Project", label: "Project"});
  useEffect(() => {
    console.log(actProject);
  }, [actProject]) 

  return (
    <div className="App"> 
    <Router>
    <header className="App-header">
        <SideMenu onProjectChange={(value) => {setActProject(value)
        }}/>
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