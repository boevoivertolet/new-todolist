import React, {ChangeEvent, KeyboardEvent, MouseEventHandler, useState} from 'react';
import {FilterValuesType} from '../App';


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: TodoListPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const onClickButtonHandler = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle(' ');
    }
    const onClickAll =() => {
        props.changeFilter('all')
    }
    const onClickActive = () => {
        props.changeFilter('active')
    }
    const onClickCompleted = () => {
        props.changeFilter('completed')
    }
    const removeTaskButton =  props.tasks.map((t) => {
        return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={(e) => {
                props.removeTask(t.id)
            }}>-
            </button>
        </li>
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressInputHandler}
                />
                <button onClick={onClickButtonHandler}>+</button>
            </div>
            <ul className={'ul'}>
                {removeTaskButton}
            </ul>
            <div>
                <button onClick={onClickAll}>all</button>
                <button onClick={onClickActive}>active</button>
                <button onClick={onClickCompleted}>completed</button>
            </div>
        </div>
    )
}

