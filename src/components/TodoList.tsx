import React, {useState} from 'react';
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

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={(e) => {
                    setNewTaskTitle(e.currentTarget.value)}}/>
                <button onClick={(e) => props.addTask(newTaskTitle)}>+</button>
            </div>
            <ul className={'ul'}>
                {
                    props.tasks.map((t) => {
                        return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={(e) => {
                                props.removeTask(t.id)
                            }}>-
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>all
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>completed
                </button>
            </div>
        </div>
    )
}

