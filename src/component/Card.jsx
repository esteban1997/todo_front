import React from 'react'

export const Card = ({todo,id,description,origin_task,state_id,deleteTodo}) => {
  return (
    <div className='card' key = {id}>
      <h1>{id}</h1>
      <h1>{description}</h1>
      <h1>{origin_task}</h1>
      <h1>{state_id}</h1>
      <button onClick={()=>deleteTodo(id)}>Eliminar</button>
    </div>
  )
}
