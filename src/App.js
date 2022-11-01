import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProjectTree from './pages/ProjectTree/ProjectTree';
import LoginPage from './pages/LoginPage/LoginPage';
import NewProjectPage from './pages/NewProjectPage/NewProjectPage';
import LogoutPage from './pages/LogoutPage/LogoutPage';

import "./App.css";
import SideMenu from './components/SideMenu/SideMenu';
import Loader from './components/Loader/Loader';

import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { isAuthenticated, isLoading, user} = useAuth();

  useEffect(() => {
    if(isAuthenticated)
      console.log(user.googleId);
  }, [isAuthenticated, user]);

  if(isLoading) return <Loader display={true}/>

  return (
    <div className="App"> 
    <Router>
      <div className="header">
        {isAuthenticated ?  <SideMenu/> : null}
      </div>
      <div className="content">
         { isAuthenticated ? 
          <Routes>
            <Route path="/home" element={<HomePage/>} />        
            <Route path="/new" element={<NewProjectPage/>} />        
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/tree" element={<ProjectTree/>} />
            <Route path="/notfound" element={<NotFoundPage />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/notfound" replace />} />          
          </Routes>
           : 
          <Routes>
            <Route path="/login" element={<LoginPage />} />    
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        }
      </div>
    </Router>
  </div>
  )
}

export default App