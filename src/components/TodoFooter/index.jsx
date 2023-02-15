import React, { useContext } from 'react';
import TodoContext from '../../context/TodoContext';

const TodoFooter = () => {
  const { filter, setFilter, state, dispatch } = useContext(TodoContext);

  const handleClick = (filterName) => {
    setFilter(filterName);
  }

  const handleClearCompleted = () => {
    dispatch({type: 'CLEAR_COMPLETED'});
  }

  const itemsLeft = () => {
    const len = state.todos.filter(todo => !todo.completed).length;
    return (
      <span className="todo-count"><strong>{len}</strong> {len === 1 ? 'item' : 'items'} left</span>
    )
  }
  return (
    <footer className="footer">
      {itemsLeft()}
      <ul className="filters">
        <li>
          <a className={filter === 'all' ? 'selected':''} onClick={() => handleClick('all')}>All</a>
        </li>
        <li>
          <a className={filter === 'active' ? 'selected':''} onClick={() => handleClick('active')}>Active</a>
        </li>
        <li>
          <a className={filter === 'completed' ? 'selected':''} onClick={() => handleClick('completed')}>Completed</a>
        </li>
      </ul>
      <button className="clear-completed" onClick={handleClearCompleted}>Clear completed</button>
    </footer>
  );
}

export default TodoFooter;