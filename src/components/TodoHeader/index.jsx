import React, { useContext, useState } from "react";
import ActionTypes from "../../actions/TodoActions";
import TodoContext from "../../context/TodoContext";

const TodoHeader = () => {
  const { dispatch } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch({type: ActionTypes.ADD_TODO, payload: inputValue})
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
