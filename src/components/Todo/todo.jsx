import { useRef, useState } from "react";
import { formatTime } from "../../utils/formatTime";
import { twMerge } from "tailwind-merge";

export const Todo = ({ todo, setTodo, currentTodo, setCurrentTodo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef(null);
  // const [inputValue,setInputValue] = useState(null);

  // const handleInputRef = ()=>{
  //   setInputValue(inputRef.current.value)
  // }

  const handleSave = async () => {
    try {
      const value = inputRef.current.value.trim();
      if (!value) return;

      const editedTodo = { content: value, time: todo.time };

      const res = await fetch(`http://localhost:3000/todo/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(editedTodo),
      });
      if (!res.ok) throw new Error("데이터 수정 실패");

      const data = await res.json();
      setTodo((prev) => prev.map((el) => (el.id === todo.id ? data : el)));
    } catch (error) {
      console.log(error);
    } finally {
      setIsEdit(false);
    }
  };

  const deletedTodo = async () => {
    try {
      const res = await fetch(`http://localhost:3000/todo/${todo.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("삭제 실패");

      setTodo((prev) => prev.filter((el) => el.id !== todo.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStart = () => {
    setCurrentTodo(() => {
      return todo.id === currentTodo ? null : todo.id;
    });
  };

  const buttonClass = twMerge(
    "p-2.5 min-w-[100px] bg-lime-100 shadow-sm shadow-offset-x-4 shadow-offset-y-2 shadow-spread-2 rounded-2xl font-bold cursor-pointer",
    currentTodo === todo.id && "bg-gray-400"
  );

  return (
    <li className="flex items-center gap-2">
      <div className="flex-[1] font-stretch-110% border-[1.5px] border-gray-300 rounded-xl px-2 py-1.5 min-w-[120px]">
        {isEdit ? (
          <input
            defaultValue={todo.content}
            ref={inputRef}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        ) : (
          todo.content
        )}
      </div>
      <div className="flex items-center gap-2">
        {formatTime(todo.time)}
        <button className={buttonClass} onClick={handleStart}>
          {currentTodo === todo.id ? "STARTED" : "START"}
        </button>
        {isEdit ? (
          <button 
          className="p-2.5 min-w-[100px] bg-lime-100 shadow-sm shadow-offset-x-4 shadow-offset-y-2 shadow-spread-2 rounded-2xl font-bold cursor-pointer"          
          onClick={handleSave}>SAVE</button>
        ) : (
          <button 
          className="p-2.5 min-w-[100px] bg-lime-100 shadow-sm shadow-offset-x-4 shadow-offset-y-2 shadow-spread-2 rounded-2xl font-bold cursor-pointer"
          onClick={() => {setIsEdit(true)
          }}>EDIT</button>
        )}
        <button
          className="p-2.5 min-w-[100px] bg-lime-100 shadow-sm shadow-offset-x-4 shadow-offset-y-2 shadow-spread-2 rounded-2xl font-bold cursor-pointer"
          onClick={deletedTodo}
        >
          DELETE
        </button>
      </div>
    </li>
  );
};
