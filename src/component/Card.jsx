import React from 'react'
import { StateSelect } from './StateSelect'

export const Card = ({todo,id,description,origin_task,state_id,todoStates,deleteTodo}) => {
  return (
    <div className='card' key = {id}>
      <h1>{id}</h1>
      <h1>{description}</h1>
      <h1>{origin_task}</h1>
      <h1>{state_id}</h1>
      <StateSelect state_id={state_id} todoStates={todoStates}></StateSelect>
      <button onClick={()=>deleteTodo(id)}>Eliminar</button>
    </div>
  )
}
