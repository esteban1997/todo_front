import { StateSelect } from './StateSelect'
import { useForm } from '../hooks/useForm'

export const Card = ({id,description,origin_task,state_id,todoStates,deleteTodo,updateTodo,user}) => {

  
  const todoForm = {
    id:id,
    description:description,
    state_id:state_id,
    origin_task:0
  }

  const {formState,onSelectChange} = useForm(todoForm)

  const updateTodoData = () => {
    updateTodo(user,formState)
  }

  const deleteTodoData = (id) => {
    deleteTodo(user,id)
  }

  return (
    <div className='card' key = {id}>
      <div hidden>{id}</div>
      <h1>{description}</h1>
      <h1 hidden>{origin_task}</h1>
      <div className='content-row'>
        <StateSelect name="state_id" state_id={formState.state_id} todoStates={todoStates} onSelectChange = {onSelectChange}></StateSelect>
        <div className='button-container'>
          <button className="button delete-button" onClick={()=>deleteTodoData(id)}>Eliminar</button>
          <button className="button update-button" onClick={()=>updateTodoData()}>Actualizar</button>
        </div>
      </div>
    </div>
  )
}
