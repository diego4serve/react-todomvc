import React, { useContext, useRef, useState } from "react";
import TodoContext from "../../context/TodoContext";

const TodoMain = () => {
  const { todos, setTodos, filter } = useContext(TodoContext);
  const [editing, setEditing] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const allChecked = todos.every(todo => todo.completed === true);

  const handleToggleAll = (event) => {
    const isChecked = event.target.checked;
    setTodos(todos.map(todo => {
      return {...todo, completed: isChecked};
    }))
  }

  const handleToggle = (id) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo;
    }))
  }

  const handleDestroy = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === "all") return true;
    if (filter === "active" && !todo.completed) return true;
    if (filter === "completed" && todo.completed) return true;
    return false;
  });

  const inputRefs = useRef([]);

  const handleFocus = (index, todoId, title) => {
    setEditing(todoId);
    setInputValue(title)
    inputRefs.current[index].focus();
  };

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter") {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: inputValue}
      }
      return todo;
    }))
    setEditing(null);
  }
  }

  const handleOnBlur = (todoId) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, title: inputValue}
      }
      return todo;
    }))
    setEditing(null);
  }

  const liTags = filteredTodos.map((todo, index) => (
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
        <label onDoubleClick={() => handleFocus(index, todo.id, todo.title)}>
          {todo.title}
        </label>
        <button
          className="destroy"
          onClick={() => handleDestroy(todo.id)}
        ></button>
      </div>
      <input
        ref={(el) => (inputRefs.current[index] = el)}
        key={todo.id}
        className="edit"
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event, todo.id)}
        onBlur={() => handleOnBlur(todo.id)}
        type="text"
        value={inputValue}
      />
    </li>
  ));

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={allChecked}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">{liTags}</ul>
    </section>
  );
};

export default TodoMain;
