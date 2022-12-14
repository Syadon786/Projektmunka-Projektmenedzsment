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
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    setIsAuthLoading(true);
    const fetchUserData = async () => {
        const userData = await request.get("/getuser");
        if(userData.data) {
           console.log(userData.data);   
            setUser(new User(
                  userData.data._id, 
                  userData.data.name, 
                  userData.data.photo,
                  userData.data.email));    
            setIsAuthenticated(true);
          }
          setIsAuthLoading(false);
        }   
    fetchUserData();

  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, isAuthLoading,  user}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;