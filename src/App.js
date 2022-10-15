import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";

import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <Router>
    <Navbar/>
    <div className="App">
    <header className="App-header">
      {/* <Navbar/> */}
    </header>
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/notfound" element={<NotFoundPage />} />

      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/notfound" replace />} />
    </Routes>
  </div>
  </Router>
  )
}

export default App