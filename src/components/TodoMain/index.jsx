import React, { useContext } from "react";
import ActionTypes from "../../actions/TodoActions";
import TodoContext from "../../context/TodoContext";
import TodoList from "../TodoList";

const TodoMain = () => {
  const { state, dispatch } = useContext(TodoContext);
  const areAllChecked = state.todos.every(todo => todo.completed === true);

  const handleToggleAll = (event) => {
    dispatch({type: ActionTypes.TOGGLE_COMPLETED_ALL, payload: event.target.checked})
  }

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
      <TodoList />
    </section>
  );
};

export default TodoMain;
