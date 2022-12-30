import React from 'react'
import { currentLoggedInUser } from '../../auth/auth'
import Base from '../../components/Base';

function UserProfile() {
   const user = currentLoggedInUser();
   console.log(user);
  return (
    <Base>
      <h1>NAME : {user.name}</h1>
      <h1>USERNAME : {user.email}</h1>
      <h1>ROLE : {user.roles[0].roleName}</h1>
    </Base>
  )
}

export default UserProfile