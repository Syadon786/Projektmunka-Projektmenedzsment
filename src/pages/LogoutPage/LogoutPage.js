import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Page from '../../components/Page/Page'
import { useAuth } from '../../contexts/AuthContext'

import request from '../../util/request'

import classes from '../LoginPage/LoginPage.module.css'

const LogoutPage = () => {
  const navigate = useNavigate();  
  const {setIsAuthenticated} = useAuth();

  const logout = async () => {
    const res = await request.get('/auth/logout');
    console.log(res);
    if(res.data === "success") {
        setIsAuthenticated(false);
        navigate("/login");
    }
  }

  return (
    <Page title="Logout" noCard>
     <div className={`${classes.loginContainer} container align-items-center justify-content-center vh-100`}>
     <div className={`${classes.loginWindow} row justify-content-center`}>
        <div className="col-md-8">
            <div className="card">
                <div className="card-header">Logout</div>
                <div className="card-body">
                <div className="mb-2 text-center">See You later.</div>
                <div className="d-grid gap-2">
                    <Button onClick={logout}>
                        Logout
                    </Button>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>
</Page>
  )
}

export default LogoutPage