import React from 'react'
import Button from '../../components/Button/Button'
import Page from '../../components/Page/Page'

import classes from "./LoginPage.module.css";
import googleLogo from  "../../assets/icons8-google-48.png";

const LoginPage = () => {
  return (
    <Page title="Login" noCard>
        <div className={`${classes.loginContainer} container align-items-center justify-content-center vh-100`}>
        <div className={`${classes.loginWindow} row justify-content-center`}>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Log in or Sign up</div>
                    <div className="card-body">
                    <div className="mb-2">Already a member? Log in with Google</div>
                    <div className="d-grid gap-2">
                        <Button color="light">
                            <div className={classes.loginBtn}>
                                <img className={classes.loginIcon} src={googleLogo} alt="login logo"/>Log in with Google
                            </div>
                        </Button>
                    </div>
                    <div className="mb-2 mt-2">Sign up with Google:</div>
                    <div className="d-grid gap-2">
                        <Button>
                            <div className={classes.loginBtn}>
                                <img className={classes.loginIcon} src={googleLogo} alt="login logo"/>Sign up with Google
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