import React, { useEffect, useState } from 'react'
import { currentLoggedInUser, isLoggedIn } from '../auth/auth';
import userContext from './userContext'

function UserProvider({children}) {

  const [user,setUser] = useState({
    data: {},
    login: false
  });

  useEffect(() => {
    setUser({
      data: currentLoggedInUser(),
      login: isLoggedIn()
    });
  },[]);

  return (
    <userContext.Provider value={{user,setUser}}>
      {children}
    </userContext.Provider>
  )
}

export default UserProvider