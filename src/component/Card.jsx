import React from 'react'
import { StateSelect } from './StateSelect'
import { useForm } from '../hooks/useForm'

export const Card = ({todo,id,description,origin_task,state_id,todoStates,deleteTodo,updateTodo}) => {

  
  const todoForm = {
    description:description,
    state_id:state_id,
    origin_task:0
  }

  const {formState,onSelectChange} = useForm(todoForm)

  return (
    <div className='card' key = {id}>
      <h1>{id}</h1>
      <h1>{description}</h1>
      <h1>{origin_task}</h1>
      <h1>{state_id}</h1>
      <StateSelect name="state_id" state_id={formState.state_id} todoStates={todoStates} onSelectChange = {onSelectChange}></StateSelect>
      <button onClick={()=>deleteTodo(id)}>Eliminar</button>
      <button onClick={()=>updateTodo(id)}>Actualizar</button>
    </div>
  )
}
