

import { useState, useContext, memo } from "react";
import {Context} from "../../context"

// CSS
import "./todoForm.css"
import { FcAddRow } from 'react-icons/fc';




const TodoForm = () => {

    const {handleTodoAdd} = useContext(Context)
    const [todoData, setTodoData] = useState(
        {
            title: "",
            description: "",
        }
    )

    return (
        <div className="todoForm">
            <form className="todoForm_form" onSubmit={e => {
                e.preventDefault();
                handleTodoAdd(todoData);
                console.log(todoData);
                setTodoData({title: "", description: ""})
            }}>

                <input className="todoForm_form_title" type="text" name="title" placeholder="Title" value={todoData.title}
                    onChange={e => setTodoData(prevData => ({
                        ...prevData,
                        title: e.target.value
                    }))} />

                <textarea rows="9" cols="" className="todoForm_form_description" type="text" name="description" placeholder="Description (optional)" value={todoData.description}
                    onChange={e => setTodoData(prevData => ({
                        ...prevData,
                        description: e.target.value
                    }))} />

                <div className="todoForm_form_button">
                    <span className="todoForm_form_button_text">Add Todo</span>
                    <button>{<FcAddRow size={45}/>}</button>
                </div>
            </form>
        </div>
    )
}

export default memo(TodoForm);
