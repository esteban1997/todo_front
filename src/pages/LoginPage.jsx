import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useForm } from '../hooks/useForm'

export const LoginPage = () => {

  const loginForm = {
    username : '',
    password : ''
  }

  const {formState,onInputChange} = useForm(loginForm)

  const {user,loginAppUser,logoutAppUser} = useContext(UserContext)

  const loginLogoutUser = (event) => {
    if(!user.loged){
      event.preventDefault()
      loginAppUser(formState)
    }else{
      event.preventDefault()
      logoutAppUser()
    }
  }
  
  return (
    <>
      <form onSubmit={loginLogoutUser}>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input 
          type="text" 
          className="form-control" 
          id="username" 
          name="username" 
          aria-describedby="emailHelp" 
          placeholder="Ingresa nombre de usuario"
          onChange={onInputChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input 
          type="password" 
          className="form-control" 
          id="password" 
          name="password" 
          placeholder="Contraseña"
          onChange={onInputChange}/>
        </div>
        {  !user.loged ? 
          <button type="submit" className="btn btn-primary">Logear</button> : 
          <button type="submit" className="btn btn-primary">cerrar sesion</button>
        }
      </form>
    </>
  )
}
