import React, {createContext, useContext, useEffect, useState} from 'react'
import request from '../util/request';
import User from '../model/User.model'

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
        const userData = await request.get("/getuser");
        if(userData.data) {
           console.log(userData.data);   
            setUser(new User(
                  userData.data.googleId, 
                  userData.data.name, 
                  userData.data.photo,
                  userData.data.email));    
            setIsAuthenticated(true);
        }
    }
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;