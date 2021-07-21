
import React, { useState, useContext, useMemo } from "react";
import { Context } from "../../context";
import "./todoItem.css";

const TodoItem = ({todo}) => {

    // const localTodo = 

    const {handleOnChackedTodo, handleOnDelTodo} = useContext(Context)

    const [checked, setChecked] = useState(false);
    const [localTodo, setLocalTodo] = useState(todo)
    const [edit, setEdit] = useState(false)

    const handleEditButton = () => setEdit(!edit)

    console.log(todo.title);
    return (
        <div className="todoItem">
            <div className="todoItem_status">
                <input className="todoItem_status_checkbox" type="checkbox" checked={todo.isCompleted} onChange={(e) => {
                    setChecked(e.target.checked)
                    handleOnChackedTodo({
                        ...todo,
                        isCompleted: e.target.checked
                    })
                }}/>
                <span className={checked? 'todoItem_status_completed': 'todoItem_status_active'}>
                    {checked? 'Completed': 'Active'}
                </span>
            </div>
           
            <div className="todoItem_content">
                <div className="todoItem_content_title">
                    <span className="todoItem_content_title_static" >Title: </span>
                    <span className="todoItem_content_title_dinamic">{localTodo.title}</span>
                </div>
                {(todo.description && todo.description.length > 5) ?
                    <div className="todoItem_content_description">
                        <span className="todoItem_content_description_static">Description: </span>
                        <span className="todoItem_content_description_dinamic">{localTodo.description}</span>
                    </div>: null }
            </div>
            
            <div className="todoItem_buttons">
                <button  
                    className="todoItem_buttons_del"
                    onClick={() => handleOnDelTodo(todo)} >
                        Delate
                </button>
                <button  
                    className="todoItem_buttons_edit"
                    onClick={handleEditButton} >
                        Edit
                </button>
                
            </div>

            {
                edit ?
                    <div className="todoItem_edit">
                        <form className="todoItem_edit_form" onSubmit={e => {
                            e.preventDefault();
                        }}>

                            <input className="todoItem_edit_form_title" type="text" name="title" placeholder="Title" value={localTodo.title} 
                                onChange={e => setLocalTodo(prevTodo => ({
                                    ...prevTodo,
                                    title: e.target.value
                                }))} />

                            <textarea rows="9" cols="" className="todoItem_edit_form_description" type="text" name="description" placeholder="Description (optional)" value={localTodo.description} 
                                onChange={e => setLocalTodo(prevTodo => ({
                                    ...prevTodo,
                                    description: e.target.value
                                }))} />

                            <button 
                                className="todoItem_edit_form_button"
                                onClick={handleEditButton}
                            >Done</button>
                        </form>
                    </div>: null
            }
            
            
        </div>
    )
} 

export default React.memo(TodoItem) ;