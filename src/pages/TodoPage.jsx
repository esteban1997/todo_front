import React, { useContext, useEffect } from 'react'
import { Card } from '../component/Card'
import { TodoContext } from '../context/TodoContext'
import { UserContext } from '../context/UserContext'

export const TodoPage = () => {

  const {todoList,deleteTodo,fetchProductos} = useContext(TodoContext)
  const {user} = useContext(UserContext)

  useEffect(() => {
    fetchProductos(user);
  }, [user]);

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
            deleteTodo={deleteTodo}
          />
        )
      ) : (
        <p>No tasks available</p>
      )}
    </>
  )
}
