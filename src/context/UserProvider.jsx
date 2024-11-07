import React, { useState } from 'react'
import {UserContext} from './UserContext'

export const UserProvider = ({children}) => {

  const userData = {
    id:0,
    username:'',
    first_name:'',
    second_name:'',
    first_lastname:'',
    second_lastname:'',
    token:'',
    loged:false
  }

  const [user, setUser] = useState(userData)

  const loginUser = async (form) => {

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    const config = {
      method: 'POST',
      body: formData 
    }

    const token_response = await fetch('http://127.0.0.1:8000/token',config)
    const token_data = await token_response.json()
    if(token_data.access_token){

      const configUser = {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token_data.access_token}`,
        }
      }
      
      const user_response = await fetch('http://127.0.0.1:8000/users/me/',configUser)
      const user_data = await user_response.json()

      setUser((prev)=>({
        ...prev,
        id:user_data.id,
        username:user_data.username,
        first_name:user_data.first_name,
        second_name:user_data.second_name,
        first_lastname:user_data.first_lastname,
        second_lastname:user_data.second_lastname,
        token:token_data.access_token,
        loged:true
      }))
    }else{
      alert('Credenciales incorrectas')
    }
  }

  const loginAppUser = (form) => {
    loginUser(form)
  }

  const logoutAppUser = () => {
    setUser((prevUser)=>({
      ...prevUser,
      token:'',
      loged:false
    }))
  }

  return (
    <UserContext.Provider value={{user,setUser,loginAppUser,logoutAppUser}}>
      {children}
    </UserContext.Provider>
  )
}
