import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";

import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Navbar from './components/Navbar/Navbar';
import ProjectTree from './pages/ProjectTree/ProjectTree';

import "./App.css";

const App = () => {
  return (
    <Router>
    <div className="App">
    <Navbar/>
    <div className="content">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/tree" element={<ProjectTree />} />
        <Route path="/notfound" element={<NotFoundPage />} />

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </div>
  </div>
  </Router>
  )
}

export default App