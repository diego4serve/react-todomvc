import React, { useContext, useEffect, useRef, useState } from "react";
import TodoContext from "../../context/TodoContext";

const TodoMain = () => {
  const { state, dispatch, filter } = useContext(TodoContext);
  const [editing, setEditing] = useState(undefined);
  const [inputValue, setInputValue] = useState(undefined);
  const areAllChecked = state.todos.every(todo => todo.completed === true);

  const handleToggleAll = (event) => {
    dispatch({type: 'TOGGLE_COMPLETED_ALL', payload: event.target.checked})
  }

  const handleToggle = (todoId) => {
    dispatch({type: 'TOGGLE_COMPLETED', payload: todoId});
  }

  const handleDestroy = (todoId) => {
    dispatch({type: 'DELETE_TODO', payload: todoId});
  }

  const filteredTodos = state.todos.filter(todo => {
    if (filter === "all") return true;
    if (filter === "active" && !todo.completed) return true;
    if (filter === "completed" && todo.completed) return true;
    return false;
  });

  const inputRefs = useRef({});

  const handleFocus = (todoId, title) => {
    setEditing(todoId);
    setInputValue(title)
  };

  useEffect(() => {
    if (editing) {
      inputRefs.current[editing].focus();
    }
  }, [editing])

  const handleKeyDown = (event, todoId, title) => {
    if (event.key === 'Enter') {
      dispatch({ type: 'EDIT_TODO', payload: { id: todoId, title: inputValue } });
      setEditing(null);
    }
    if (event.key === 'Escape') {
      setInputValue(title)
      setEditing(null);
    }
  };

  const handleOnBlur = (todoId) => {
    dispatch({type: 'EDIT_TODO', payload: {id: todoId, title: inputValue}})
    setEditing(null);
  };

  const handleInputChange = (event, id) => {
    if (id === editing) {
      setInputValue(event.target.value);
    }
  };

  const liTags = filteredTodos.map((todo) => (
    <li
      key={todo.id}
      className={
        todo.completed && editing !== todo.id ? "completed" : editing === todo.id ? "editing" : ""
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
  ));

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={areAllChecked}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">{liTags}</ul>
    </section>
  );
};

export default TodoMain;
