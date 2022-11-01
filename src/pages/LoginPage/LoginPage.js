import React from 'react'
import Button from '../../components/Button/Button'
import Page from '../../components/Page/Page'

import classes from "./LoginPage.module.css";
import googleLogo from  "../../assets/icons8-google-48.png";

const LoginPage = () => {
  const login = () => {
    window.open('http://localhost:3001/auth/google', "_self");
  } 

  return (
    <Page title="Login" noCard>
        <div className={`${classes.loginContainer} container align-items-center justify-content-center vh-100`}>
        <div className={`${classes.loginWindow} row justify-content-center`}>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Log in or Sign up</div>
                    <div className="card-body">
                    <div className="mb-2 text-center">Already a member?</div>
                    <div className="mb-2 text-center">Log in with Google otherwise Sign up and create an account.</div>
                    <div className="d-grid gap-2">
                        <Button onClick={login}>
                            <div className={classes.loginBtn}>
                                <img className={classes.loginIcon} src={googleLogo} alt="login logo"/>Log in or Sign up with Google
                            </div>
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

export default LoginPage