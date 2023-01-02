import React, { useEffect, useState } from 'react'
import { currentLoggedInUser } from '../auth/auth';
import userContext from './userContext'

function UserProvider({children}) {

  const [user,setUser] = useState({});

  useEffect(() => {
    const user = currentLoggedInUser();
    console.log("user 1 : "+JSON.stringify(user));
    if(user){
      console.log("user 2 : "+JSON.stringify(user));
      setUser(user);
    }
  },[]);

  return (
    <userContext.Provider value={user}>
      {children}
    </userContext.Provider>
  )
}

export default UserProvider