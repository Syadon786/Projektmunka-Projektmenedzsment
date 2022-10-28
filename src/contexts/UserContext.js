import React, {createContext, useEffect, useState} from 'react'
import request from '../util/request';

export const userContext = createContext({});
const UserContext = ({children}) => {
  const [userObject, setUserObject] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
        const userData = await request.get("/getuser");
        if(userData.data) {
            setUserObject(userData.data);    
        }
    }
    fetchUserData();
  }, []);

  return (
    <userContext.Provider value={userObject}>
        {children}
    </userContext.Provider>
  )
}

export default UserContext