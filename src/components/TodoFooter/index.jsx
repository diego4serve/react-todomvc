import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TodoContext from '../../context/TodoContext';

const TodoFooter = () => {
  const { filter, setFilter, state, dispatch } = useContext(TodoContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash === '') {
      navigate('/#/');
    }
  }, []);

  const getFilterName = (string) => {
    let filterName = 'all'
    switch (string) {
      case '#/active':
        filterName = 'active';
        break;
      case '#/completed':
        filterName = 'completed'
        break;
      default:
        break;
    }
    return filterName;
  }

  useEffect(() => {
    const filterName = getFilterName(location.hash);
    setFilter(filterName);
  }, [location]);

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
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
          <Link className={filter === 'all' ? 'selected' : ''} to='/#/'>All</Link>
        </li>
        <li>
          <Link className={filter === 'active' ? 'selected' : ''} to='/#/active'>Active</Link>
        </li>
        <li>
          <Link className={filter === 'completed' ? 'selected' : ''} to='/#/completed'>Completed</Link>
        </li>
      </ul>
      <button className="clear-completed" onClick={handleClearCompleted}>Clear completed</button>
    </footer>
  );
}

export default TodoFooter;