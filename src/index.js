import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './contexts/AuthContext';
import ProjectProvider from './contexts/ProjectContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <ProjectProvider>
            <App/>
        </ProjectProvider>
    </AuthProvider>
);
