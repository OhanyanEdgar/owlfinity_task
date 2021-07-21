import React, { useState, useEffect, useCallback } from "react"

// css
import './App.css';

// context
import { Context } from "./context"

// components
import Header from "./components/header/Header.jsx";
import TodoController from "./components/todoController/TodoController.jsx"
import TodoList from "./components/todoList/TodoList.jsx"
import TodoForm from "./components/todoForm/TodoForm.jsx"


function App() {
  const [sortedNewerAtFirst, setSortedNewerAtFirst] = useState(true);
  const [todos, setTodos] = useState([
    {
      title: "Wake up",
      description: "Every day starts at 7:00 am",
      isCompleted: false,
      id: Date.now() + 1,
    },
    {
      title: "Take shower",
      description: "It will halp me to realy wake up )))",
      isCompleted: false,
      id: Date.now() + 2,
    },
    {
      title: "Go for a wolk",
      description: "Think about your body and health too ...",
      isCompleted: false,
      id: Date.now() + 3,
    },
  ])

  const [todosToShow, setTodosToShow] = useState(todos);

  useEffect(() => {
    setTodosToShow(todos)
  }, [todos])

  const handleTodoAdd = useCallback((todoData) => {
    if (todoData.title && todoData.title.length > 2) {
      setTodos(prevTodos => [
        ...prevTodos,
        {
          title: todoData.title,
          description: todoData.description,
          isCompleted: false,
          id: Date.now(),
        },
      ])
    }
  }, [])

  const handleOnChackedTodo =  useCallback((newTodo) => {
    setTodos(prevState => prevState.map(todo => {
      if (newTodo.id === todo.id){
        return newTodo
      }
      return todo
    }));
  }, [])

  const handleOnDelTodo = useCallback((todo) => {
    setTodos(prevState => prevState.filter(t => t.id !== todo.id))
  }, []);

  const handleOnClearCompleted = useCallback(() => {
    setTodos(prevState => prevState.filter(todo => !todo.isCompleted))
  }, []);

  const handleOnFilterByDate = () => {
    const filterTodos = [...todosToShow];
    sortedNewerAtFirst ?
      filterTodos.sort((a, b) => (a.id < b.id) ? 1 : -1):
      filterTodos.sort((a, b) => (a.id > b.id) ? 1 : -1);
    setTodosToShow(filterTodos);
    setSortedNewerAtFirst(!sortedNewerAtFirst);
  }

  const handleOnShowUndone = useCallback(() => {
    const showTodos = todos.filter(todo => !todo.isCompleted)
    setTodosToShow(showTodos)
  }, [todos])

  const handleShowDone = useCallback(() => {
    const showTodos = todos.filter(todo => todo.isCompleted)
    setTodosToShow(showTodos)
  }, [todos])

  const handleOnShowAll = useCallback(() => {
    setTodosToShow(todos)
  }, [todos])

  return (
    <Context.Provider value={{
      handleTodoAdd,
      todosToShow,
      handleOnClearCompleted,
      handleOnFilterByDate,
      sortedNewerAtFirst,
      handleOnShowUndone,
      handleShowDone,
      handleOnShowAll,
      handleOnChackedTodo,
      handleOnDelTodo,

    }}>
      <div className="App">
        <div className="app_container">
          <Header />
          <TodoForm/>
          <TodoController/>
          <TodoList/>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
