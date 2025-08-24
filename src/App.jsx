import { useEffect, useState } from "react";
import { TodoList } from "./components/Todo/todoList";
import { TodoInput } from "./components/Todo/todoInput";
import { Clock } from "./components/Timer/Clock";
import { StopWatch } from "./components/Timer/StopWatch";
import { Timer } from "./components/Timer/Timer";
import { Advice } from "./components/advice";
import { useFetch } from "./custom-hooks/useFetch";

function App() {
  const [data, loading] = useFetch("http://localhost:3000/todo");
  const [todo, setTodo] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isTimer, setIsTimer] = useState(true);

  const handleIsTimer = () => {
    setIsTimer((prev) => !prev);
  };

  useEffect(() => {
    if (data) setTodo(data);
  }, [data, loading]);

  useEffect(() => {
    if (!currentTodo) return;

    const interval = setInterval(async () => {
      try {
        const current = todo.find((el) => el.id === currentTodo);
        if (!current) return;
        const increamentTime = current.time + 1;

        const res = await fetch(`http://localhost:3000/todo/${currentTodo}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ time: increamentTime }),
        });
        if (!res.ok) {
          console.log("시간 증가 실패");
          return;
        }

        setTodo((prev) =>
          prev.map((el) =>
            el.id === currentTodo ? { ...el, time: increamentTime } : el
          )
        );
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [todo, currentTodo]);

  return (
    <div className="w-[60vw] min-w-2xl min-h-[70vh] flex flex-col justify-start items-center gap-5 bg-white rounded-2xl py-7">
      <section className="flex flex-col gap-3 items-end">
        <h1 className="text-6xl font-extrabold font-stretch-130%">TODO LIST</h1>
        <Clock />
      </section>

      <button 
      className="py-2.5 px-3 min-w-[180px] bg-lime-100 shadow-sm rounded-2xl font-bold"
      onClick={handleIsTimer}>
        {isTimer ? "Switch to Stopwatch" : "Switch to Timer"}
      </button>
      {isTimer ? (
        <Timer isTimer={isTimer} setIsTimer={setIsTimer} />
      ) : (
        <StopWatch isTimer={isTimer} setIsTimer={setIsTimer} />
      )}

      <TodoInput setTodo={setTodo} />
      <TodoList
        todo={todo}
        setTodo={setTodo}
        currentTodo={currentTodo}
        setCurrentTodo={setCurrentTodo}
      />

      <Advice />
    </div>
  );
}

export default App;
