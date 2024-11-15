import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useForm } from '../hooks/useForm'
import '../styles/general.css'
import '../styles/login.css'

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
          className="form-control margins" 
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
          className="form-control margins" 
          id="password" 
          name="password" 
          placeholder="Contraseña"
          onChange={onInputChange}/>
        </div>
          <button type="submit" className={!user.loged ? "btn login-button" :  "btn logout-button" }>{!user.loged ? 'Logear' : 'Cerrar Sesion'}</button>
      </form>
    </>
  )
}
