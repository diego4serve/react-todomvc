import React, { useState } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoMain from './components/TodoMain';
import TodoFooter from './components/TodoFooter';
import InfoFooter from './components/InfoFooter';
import TodoContext from './context/TodoContext';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all')

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
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
