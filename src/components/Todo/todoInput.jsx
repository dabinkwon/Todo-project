import { useRef } from "react";

export const TodoInput = ({ setTodo }) => {
  const inputRef = useRef(null);

  const handleAddTodo = async () => {
    const value = inputRef.current.value.trim();
    if (!value) {
      alert("할 일을 입력해주세요.");
      inputRef.current.focus();
      return;
    }

    const newTodo = {
      content: value,
      time:0,
    };

    try {
      const res = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      if (!res.ok) throw new Error("서버 저장 실패");

      const data = await res.json();
      setTodo((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    } finally {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <form
    className="w-[437px] flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        handleAddTodo();
      }}
    >
      <input
      className="flex-[1] border-[1.5px] border-gray-300 rounded-xl pl-2"
      type="text" placeholder="할 일을 입력하세요." ref={inputRef} />
      <button
      className="p-2.5 min-w-[100px] bg-lime-100 shadow-sm shadow-offset-x-4 shadow-offset-y-2 shadow-spread-2 rounded-2xl font-bold cursor-pointer"
      >ADD</button>
    </form>
  );
};
