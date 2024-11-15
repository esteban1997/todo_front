import { useContext, useEffect } from 'react'
import { Card } from '../component/Card'
import { TodoContext } from '../context/TodoContext'
import { UserContext } from '../context/UserContext'
import { useFetch } from '../hooks/useFetch'
import { TodoForm } from '../component/TodoForm'
import '../styles/general.css'
import '../styles/card.css'

export const TodoPage = () => {

  const {todoList,deleteTodoService,updateTodoService,fetchTodo,registerTodoService} = useContext(TodoContext)
  const {user} = useContext(UserContext)

  useEffect(() => {
    fetchTodo(user);
  }, [user]);

  const {data:todoStates,isLoading,errors} = useFetch('http://127.0.0.1:8000/todo_states/todos_states')

  if (user.id==0) return <p>Porfavor logeese para crear tareas y visualizar sus tareas...</p>;
  if (isLoading) return <p>Cargando estados de tareas...</p>;
  if (errors) return <p>Error: {errors}</p>;

  return (
    <>
    <TodoForm todoStates={todoStates} registerTodoService={registerTodoService}></TodoForm>
    {todoList && todoList.length > 0 ? (
        todoList.map(todo =>
          <Card 
            todo={todo}
            todoStates={todoStates}
            key={todo.id} 
            id={todo.id} 
            description={todo.description} 
            origin_task={todo.origin_task} 
            state_id={todo.state_id} 
            deleteTodo={deleteTodoService}
            updateTodo={updateTodoService}
            user={user}
          />
        )
      ) : (
        <p>No tasks available</p>
      )}
    </>
  )
}
