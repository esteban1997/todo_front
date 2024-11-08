import React from 'react'
import { useFetch } from '../hooks/useFetch'

export const StateSelect = ({todoStates,state_id}) => {
  console.log('todoStates')
  console.log(todoStates)

  return (
    <>
      <select className="form-select" aria-label="Default select example">
        {
          todoStates.map((state)=>{
            return <option value={state.id} 
                            key={state.id}
                            selected={state.id === state_id}>{state.description}</option>
          })
        }
      </select>
    </>
  )
}
