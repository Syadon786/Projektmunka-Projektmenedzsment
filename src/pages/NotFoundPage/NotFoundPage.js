import React from 'react'
import { useNavigate } from "react-router-dom";

import Button from '../../components/Button/Button';

import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();
    
  return (
  <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
          <p className="lead">
              The page you’re looking for doesn’t exist.
            </p>
          { <Button onClick={() => navigate("/home")}>
              Go Home
          </Button> }
      </div>
  </div>
  ); 
}

export default NotFoundPage