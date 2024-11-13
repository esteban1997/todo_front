import React, { useReducer} from 'react'
import {TodoContext} from './TodoContext'

export const TodoProvider = ({children}) => {
  
  const updateTodo = (data) =>{
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
        updateTodo(todo_data[0].items);
      }
    }else{
      updateTodo([]);
    }
  }

  const registerTodo = async (user,form) => {

    form = {
      ...form,
      "user_id":user.id
    }

    if(user.token!=''){
      const configUser = {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(form)
      }
      
      const result = await fetch('http://127.0.0.1:8000/todo/create_todo',configUser)
      const parserResult = await result.json()
      if(result.status==200){
        createTodo(parserResult)
      }
    }
  }

  const updateTodoService = async (user,form) => {

    form = {
      ...form,
      "user_id":user.id
    }

    if(user.token!=''){
      const configUser = {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(form)
      }
      
      await fetch('http://127.0.0.1:8000/todo/create_todo',configUser)

      await fetchTodo(user)
    }
  }

  const todoReducer = (state = [],action={}) =>{
    switch(action.type){
      case '[TODO] Actualizar todo':
        return action.payload
      case '[TODO] Crear todo':
        return [...state, action.payload]
      case '[TODO] Eliminar todo':
        return state.filter(compra=> compra.id!== action.payload)
      default:
        return state
    }
  }

  const [todoList, dispatch] = useReducer(todoReducer, [])
  
  return (
    <TodoContext.Provider value={{todoList,deleteTodo,fetchTodo,registerTodo,updateTodoService}}>
      {children}
    </TodoContext.Provider>
  )
}
