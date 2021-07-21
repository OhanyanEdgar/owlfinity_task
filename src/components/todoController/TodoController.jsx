

import { useContext } from "react";
import {Context} from "../../context"

// CSS
import "./todoController.css"




const TodoController = () => {

    const {todosToShow, handleOnClearCompleted, handleOnFilterByDate,
            sortedNewerAtFirst, handleOnShowUndone, handleShowDone,
            handleOnShowAll} = useContext(Context)


    const completedSize = todosToShow.filter(todo => todo.isCompleted).length

    return (
        <div className="todoController">
            <div className="todoController_completed">
                <span>{completedSize}/{todosToShow.length} Completed</span>
                <button onClick={handleOnClearCompleted}>Clear Completed</button>
            </div>
            <div className="todoController_filters">
                <p className="todoController_filters_text">Filter Todos</p>
                <div className="todoController_filters_buttons">
                    <div>
                        <button onClick={handleOnFilterByDate}>By Date ({sortedNewerAtFirst? "newer": "older"})</button>
                        <button onClick={handleOnShowUndone} >Show Undone</button>
                    </div>
                    <button onClick={handleShowDone} >Show Done</button>
                    <button onClick={handleOnShowAll} >Show All</button>

                </div>
            </div>
        </div>
    )
}

export default TodoController;