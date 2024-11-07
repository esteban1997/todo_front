import React, { useReducer} from 'react'
import {TodoContext} from './TodoContext'

export const TodoProvider = ({children}) => {
  
  const updateProducts = (data) =>{
    const action = {
      type:'[TODO] Actualizar todo',
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
  
  const fetchProductos = async (user) => {
    if(user.token!=''){
      const configUser = {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }
      }
      
      const todo_response = await fetch('http://127.0.0.1:8000/todo/me/items',configUser)
      const todo_data = await todo_response.json()
      console.log('todo_data.items')
      console.log(todo_data[0].items.length)
      if(todo_data[0].items&&todo_data[0].items.length>0){
        updateProducts(todo_data[0].items);
      }
    }
  }

  const todoReducer = (state = [],action={}) =>{
    switch(action.type){
      case '[TODO] Actualizar todo':
        console.log('action.payload')
        console.log(action.payload)
        return action.payload
      case '[TODO] Eliminar todo':
        return state.filter(compra=> compra.id!== action.payload)
      default:
        return state
    }
  }

  const [todoList, dispatch] = useReducer(todoReducer, [])
  
  return (
    <TodoContext.Provider value={{todoList,deleteTodo,fetchProductos}}>
      {children}
    </TodoContext.Provider>
  )
}
