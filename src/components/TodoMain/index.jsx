import React, { useContext } from "react";
import TodoContext from "../../context/TodoContext";

const TodoMain = () => {
  const { todos, setTodos, filter } = useContext(TodoContext);
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

  const liTags = filteredTodos.map(todo => (
    <li key={todo.id} className={todo.completed ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggle(todo.id)}
        />
        <label>{todo.title}</label>
        <button
          className="destroy"
          onClick={() => handleDestroy(todo.id)}
        ></button>
      </div>
      <input key={todo.id} className="edit" value={todo.title} />
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
