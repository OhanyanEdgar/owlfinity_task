import './App.css';

import { Context } from "./context"


import React, { useState, useEffect } from "react"

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


  const handleTodoAdd = todoData => {
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
    
  }
// TodoList Functionality

  const handleOnChackedTodo = newTodo => {
    setTodos(todos.map(todo => {
      if (newTodo.id === todo.id){
        return newTodo
      }
      return todo
    }));
  }

  // const handleOnChackedTodo = newTodo => {
  //   const delNewTodoTwin = todos.filter(t => t.id !== newTodo.id)
  //   setTodos([
  //     ...delNewTodoTwin,
  //     newTodo,
  //   ])
  // }

  const handleOnDelTodo = todo => setTodos(todos.filter(t => t.id !== todo.id));

// TodoController Functionality

  const handleOnClearCompleted = () => setTodos(todos.filter(todo => !todo.isCompleted));

  const handleOnFilterByDate = () => {

    const filterTodos = [...todosToShow];
    sortedNewerAtFirst ? 
      filterTodos.sort((a, b) => (a.id < b.id) ? 1 : -1):
      filterTodos.sort((a, b) => (a.id > b.id) ? 1 : -1);
    setTodosToShow(filterTodos);
    setSortedNewerAtFirst(!sortedNewerAtFirst);
  }

  const handleOnShowUndone = () => {
    const showTodos = todos.filter(todo => !todo.isCompleted)
    setTodosToShow(showTodos)
  }

  const handleShowDone = () => {
    const showTodos = todos.filter(todo => todo.isCompleted)
    setTodosToShow(showTodos)
  }

  const handleOnShowAll = () => {
    setTodosToShow(todos)
  }
  

  return (
    <Context.Provider value={{
      handleTodoAdd,
      // TodoController
      todosToShow,
      handleOnClearCompleted,
      handleOnFilterByDate,
      sortedNewerAtFirst,
      handleOnShowUndone,
      handleShowDone,
      handleOnShowAll,
      // TodoList
      // TodoItem
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
