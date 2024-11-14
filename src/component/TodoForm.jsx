import { useContext } from 'react'
import { StateSelect } from './StateSelect'
import { useForm } from '../hooks/useForm'
import { UserContext } from '../context/UserContext'

export const TodoForm = ({todoStates,registerTodo}) => {

  const todoForm = {
    description:'',
    state_id:0,
    origin_task:0
  }

  const {user} = useContext(UserContext)

  const {formState,onInputChange,onSelectChange} = useForm(todoForm)

  const sendRegisterTodo = (event)=>{
    event.preventDefault()
    registerTodo(user,formState)

  }

  return (
    <>
      <form onSubmit={sendRegisterTodo}>
        <div className="form-group">
          <label htmlFor="description">Descripcion</label>
          <input 
          type="text" 
          className="form-control" 
          id="description" 
          name="description" 
          value={formState.description}
          placeholder="Ingresa la descripcion de la tarea"
          onChange={onInputChange}/>
        </div>
        <StateSelect name="state_id" todoStates={todoStates} state_id={formState.state_id} onSelectChange = {onSelectChange}></StateSelect>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </>
  )
}
