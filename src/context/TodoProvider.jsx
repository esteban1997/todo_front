import {useReducer} from 'react'
import {TodoContext} from './TodoContext'

export const TodoProvider = ({children}) => {
  
  const setTodo = (data) =>{
    const action = {
      type:'[TODO] Actualizar todo',
      payload:data
    }
    dispatch(action)
  }
  
  const createTodo = (data) =>{
    const action = {
      type:'[TODO] Crear todo',
      payload:data
    }
    dispatch(action)
  }

  const deleteTodo = (id) => {
    const action = {
      type:'[TODO] Eliminar todo',
      payload:id
    }
    dispatch(action)
  }
  
  const fetchTodo = async (user) => {
    if(user.token!=''){
      const configUser = {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }
      }
      
      const todo_response = await fetch('http://127.0.0.1:8000/todo/me/items/',configUser)
      const todo_data = await todo_response.json()
      if(todo_data[0].items&&todo_data[0].items.length>0){
        setTodo(todo_data[0].items);
      }
    }else{
      setTodo([]);
    }
  }

  const registerTodoService = async (user,data) => {

    data = {
      ...data,
      "user_id":user.id
    }

    if(user.token!=''){
      const configUser = {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(data)
      }
      
      const result = await fetch('http://127.0.0.1:8000/todo/create_todo',configUser)
      const parserResult = await result.json()
      if(result.status==200){
        createTodo(parserResult)
      }
    }
  }

  const updateTodoService = async (user,data) => {

    const dataUpdate = {
      "id":data.id,
      "state_id":data.state_id
    }

    if(user.token!=''){
      const configUser = {
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(dataUpdate)
      }
      
      console.log(dataUpdate)
      const result = await fetch('http://127.0.0.1:8000/todo/update_state_todo',configUser)
      const parse_result = await result.json()
      if(result.status==200){
        alert(parse_result.message)
      }

    }
  }

  const deleteTodoService = async (user,id) => {

    const data = {
      "id":id
    }

    if(user.token!=''){
      const configUser = {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(data)
      }
      
      const result = await fetch('http://127.0.0.1:8000/todo/delete_todo',configUser)
      if(result.status==200){
        deleteTodo(id)
      }
    }
  }

  const todoReducer = (state = [],action={}) =>{
    switch(action.type){
      case '[TODO] Actualizar todo':
        return action.payload
      case '[TODO] Crear todo':
        return [...state, action.payload]
      case '[TODO] Eliminar todo':
        return state.filter(todo=> todo.id!== action.payload)
      default:
        return state
    }
  }

  const [todoList, dispatch] = useReducer(todoReducer, [])
  
  return (
    <TodoContext.Provider value={{todoList,fetchTodo,registerTodoService,updateTodoService,deleteTodoService}}>
      {children}
    </TodoContext.Provider>
  )
}
