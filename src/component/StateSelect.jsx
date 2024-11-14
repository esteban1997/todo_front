export const StateSelect = ({name,todoStates,state_id=0,onSelectChange=() => {}}) => {

  return (
    <>
      <select value={state_id} className="form-select" name={name} aria-label="Default select example" onChange={onSelectChange}>
      <option value={0} key={0} >{'Seleccione un estado para la tarea'}</option>
        {
          todoStates.map((state)=>{
            return <option value={state.id} 
                            key={state.id}>{state.description}</option>
          })
        }
      </select>
    </>
  )
}
