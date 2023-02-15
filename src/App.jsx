import React, { useReducer, useState } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoMain from './components/TodoMain';
import TodoFooter from './components/TodoFooter';
import InfoFooter from './components/InfoFooter';
import TodoContext from './context/TodoContext';
import TodoReducer from './reducers/TodoReducer';

const TodoApp = () => {
  const [state, dispatch] = useReducer(TodoReducer, {todos: []});
  const [filter, setFilter] = useState('all')

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
        filter,
        setFilter,
      }}
    >
      <section className="todoapp">
        <TodoHeader />
        <TodoMain />
        <TodoFooter />
      </section>
    </TodoContext.Provider>
  );
}

export default function App() {
  return (
    <>
      <TodoApp />
      <InfoFooter />
    </>
  );
}
