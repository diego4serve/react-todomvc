import React, { useReducer, useState } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoMain from './components/TodoMain';
import TodoFooter from './components/TodoFooter';
import InfoFooter from './components/InfoFooter';
import TodoContext from './context/TodoContext';
import TodoReducer from './reducers/TodoReducer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const storedTodos = JSON.parse(localStorage.getItem("todos-react")) ?? [];

const TodoApp = () => {
  const [state, dispatch] = useReducer(TodoReducer, { todos: storedTodos });
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
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path='/' element={<TodoApp />} />
          <Route path='/#/active' element={<TodoApp />} />
          <Route path='/#/completed' element={<TodoApp />} />
        </Routes>
      </BrowserRouter>
      <InfoFooter />
    </>
  );
}
