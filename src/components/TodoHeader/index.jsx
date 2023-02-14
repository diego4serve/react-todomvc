import React, { useContext, useState } from "react";
import TodoContext from "../../context/TodoContext";
import generateId from "../../utils/generateId";

const TodoHeader = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const newTodo= {
        id: generateId(),
        title: inputValue,
        completed: false
      }
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
    </header>
  );
};

export default TodoHeader;
