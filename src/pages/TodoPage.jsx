import React, { useContext, useEffect } from 'react'
import { Card } from '../component/Card'
import { TodoContext } from '../context/TodoContext'
import { UserContext } from '../context/UserContext'
import { useFetch } from '../hooks/useFetch'

export const TodoPage = () => {

  const {todoList,deleteTodo,fetchProductos} = useContext(TodoContext)
  const {user} = useContext(UserContext)

  const {data:todoStates,isLoading,errors} = useFetch('http://127.0.0.1:8000/todo_states/todos_states')

  useEffect(() => {
    fetchProductos(user);
  }, [user]);

  if (isLoading) return <p>Cargando estados de tareas...</p>;
  if (errors) return <p>Error: {errors}</p>;
  
  return (
    <>
    
    {todoList && todoList.length > 0 ? (
        todoList.map(todo =>
          <Card 
          todo={todo}
            key={todo.id} 
            id={todo.id} 
            description={todo.description} 
            origin_task={todo.origin_task} 
            state_id={todo.state_id} 
            todoStates = {todoStates}
            deleteTodo={deleteTodo}
          />
        )
      ) : (
        <p>No tasks available</p>
      )}
    </>
  )
}
