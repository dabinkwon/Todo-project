import { Todo } from "./todo"

export const TodoList = ({todo,setTodo,currentTodo,setCurrentTodo})=>{
    return (
        <ul className="flex flex-col gap-5 min-w-[60vh] min-h-[30vh] p-5 border-3 border-gray-100 rounded-2xl">
            {todo.map((todo)=>
                (<Todo key={todo.id} todo={todo} setTodo={setTodo} currentTodo={currentTodo} setCurrentTodo={setCurrentTodo}/>)
            )}
        </ul>
    )
}