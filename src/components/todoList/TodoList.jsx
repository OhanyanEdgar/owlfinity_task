
import "./todoList.css"

import { useEffect, useState, useContext } from 'react';
import { Context } from "../../context";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from "../todoItem/TodoItem.jsx";

const TodoList = () => {

    const {todosToShow} = useContext(Context)
    const [localTodos, setLocalTodos] = useState(todosToShow);

    useEffect(() => {
        setLocalTodos(todosToShow)
    }, [todosToShow])

    const handleOnDragEnd = result => {
        if (!result.destination) return;
        const items = Array.from(localTodos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setLocalTodos(items);
    }

    return (
        <div className="todoList">

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                    <ul className="todoList_dropable" {...provided.droppableProps} ref={provided.innerRef}>
                            {localTodos.map((todo, index) => {
                                return (
                                    <Draggable key={`${todo.id}`} draggableId={`${todo.id}`} index={index}>
                                        {(provided) => (
                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <TodoItem todo={todo}key={todo.id} />
                                            </li>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                    </ul>
                    )}
                </Droppable>
            </DragDropContext>

        </div>
    )
}

export default TodoList;