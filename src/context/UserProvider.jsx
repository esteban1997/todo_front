import React, { useReducer, useState } from 'react'
import {UserContext} from './UserContext'

export const UserProvider = ({children}) => {

  const user_data_base = {
    id:0,
    username:'',
    first_name:'',
    second_name:'',
    first_lastname:'',
    second_lastname:'',
    token:'',
    loged:false
  }

  const updateUser = (data) =>{
    const action = {
      type:'[USER] Actualizar Usuario',
      payload:data
    }
    dispatch(action)
  }

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

      updateUser({
        ...user,
        id:user_data.id,
        username:user_data.username,
        first_name:user_data.first_name,
        second_name:user_data.second_name,
        first_lastname:user_data.first_lastname,
        second_lastname:user_data.second_lastname,
        token:token_data.access_token,
        loged:true
      })

    }else{
      alert('Credenciales incorrectas')
    }
  }

  const loginAppUser = (form) => {
    loginUser(form)
  }

  const logoutAppUser = () => {
    updateUser(user_data_base)
  }

  const userReducer = (state = [],action={}) =>{
    switch(action.type){
      case '[USER] Actualizar Usuario':
        if(action.payload.id==0){
          sessionStorage.removeItem('user');
        }else{
          sessionStorage.setItem('user', JSON.stringify(action.payload));
        }
        return action.payload
      default:
        return state
    }
  }
  const storedUser = sessionStorage.getItem('user');
  const initialState = storedUser ? JSON.parse(storedUser) : user_data_base
  const [user, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{user,loginAppUser,logoutAppUser}}>
      {children}
    </UserContext.Provider>
  )
}
