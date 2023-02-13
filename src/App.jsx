import React, { createContext, useState } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoMain from './components/TodoMain';
import TodoFooter from './components/TodoFooter';
import InfoFooter from './components/InfoFooter';

const TodoContext = createContext();

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [displayTodos, setDisplayTodos] = useState([]);
  
  return (
    <TodoContext.Provider value={{todos, setTodos, displayTodos, setDisplayTodos}}>
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
