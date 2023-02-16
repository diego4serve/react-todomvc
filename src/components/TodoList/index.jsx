import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import ActionTypes from "../../actions/TodoActions";
import TodoContext from "../../context/TodoContext";

const TodoList = () => {
  const { state, dispatch, filter } = useContext(TodoContext);
  const [editing, setEditing] = useState(undefined);
  const [inputValue, setInputValue] = useState(undefined);

  useEffect(() => {
    localStorage.setItem("todos-react", JSON.stringify(state.todos));
  }, [state]);

  const handleToggle = useCallback((todoId) => {
    dispatch({ type: ActionTypes.TOGGLE_COMPLETED, payload: todoId });
  });

  const handleDestroy = useCallback((todoId) => {
    dispatch({ type: ActionTypes.DELETE_TOD0, payload: todoId });
  });

  const filteredTodos = state.todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active" && !todo.completed) return true;
    if (filter === "completed" && todo.completed) return true;
    return false;
  });

  const inputRefs = useRef({});

  const handleFocus = useCallback((todoId, title) => {
    setEditing(todoId);
    setInputValue(title);
  });

  useEffect(() => {
    if (editing) {
      inputRefs.current[editing].focus();
    }
  }, [editing]);

  const handleKeyDown = useCallback((event, todoId, title) => {
    if (event.key === "Enter") {
      dispatch({
        type: ActionTypes.EDIT_TODO,
        payload: { id: todoId, title: inputValue },
      });
      setEditing(null);
    }
    if (event.key === "Escape") {
      setInputValue(title);
      setEditing(null);
    }
  });

  const handleOnBlur = useCallback((todoId) => {
    dispatch({ type: ActionTypes.EDIT_TODO, payload: { id: todoId, title: inputValue } });
    setEditing(null);
  });

  const handleInputChange = useCallback((event, id) => {
    if (id === editing) {
      setInputValue(event.target.value);
    }
  });

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <li
          key={todo.id}
          className={
            todo.completed && editing !== todo.id
              ? "completed"
              : editing === todo.id
                ? "editing"
                : ""
          }
        >
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <label onDoubleClick={() => handleFocus(todo.id, todo.title)}>
              {todo.title}
            </label>
            <button
              className="destroy"
              onClick={() => handleDestroy(todo.id)}
            ></button>
          </div>
          <input
            ref={(el) => (inputRefs.current[todo.id] = el)}
            key={todo.id}
            className="edit"
            onChange={(event) => handleInputChange(event, todo.id)}
            onFocus={() => setEditing(todo.id)}
            onKeyDown={(event) => handleKeyDown(event, todo.id, todo.title)}
            onBlur={() => handleOnBlur(todo.id)}
            type="text"
            value={todo.id === editing ? inputValue : todo.title}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
