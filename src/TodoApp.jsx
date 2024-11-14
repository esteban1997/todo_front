import { NavBar } from './component/NavBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage' 
import { TodoPage } from './pages/TodoPage'
import { LoginPage } from './pages/LoginPage'
import { TodoProvider } from './context/TodoProvider'
import { UserProvider } from './context/UserProvider'

export const TodoApp = () => {
  return (
    <UserProvider>
      <TodoProvider>
        <NavBar></NavBar>
        <div className='container'>
          <Routes>
            <Route path='/' element={<AboutPage></AboutPage>}></Route>
            <Route path='/todo' element={<TodoPage></TodoPage>}></Route>
            <Route path='/login' element={<LoginPage></LoginPage>}></Route>
            <Route path="/*" element={<Navigate to ='/'></Navigate>}></Route>
            <Route></Route>
          </Routes>
        </div>
      </TodoProvider>
    </UserProvider>
  )
}
