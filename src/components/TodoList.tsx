import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
    changeStatus: (taskID: string, isDone: boolean) => void
    filter: 'all' | 'active' | 'completed'
}

export function Todolist(props: TodoListPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addNewTaskTitle();
        }
    }
    const addNewTaskTitle = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }

    }
    const onClickButtonHandler = () => {
        addNewTaskTitle();
    }


    const onClickAll = () => {
        props.changeFilter('all')
    }
    const onClickActive = () => {
        props.changeFilter('active')
    }
    const onClickCompleted = () => {
        props.changeFilter('completed')
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressInputHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={onClickButtonHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul className={'ul'}>
                {
                    props.tasks.map((t) => {
                        const onClickHandler = () => props.removeTask(t.id)
                        const onChangeInputCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked)
                        }

                        return <li key={t.id}><input
                            onChange={onChangeInputCheckboxHandler}
                            type="checkbox"
                            checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>-
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ?'active-filter': ''} onClick={onClickAll}>all</button>
                <button className={props.filter === 'active' ?'active-filter': ''} onClick={onClickActive}>active</button>
                <button className={props.filter === 'completed' ?'active-filter': ''} onClick={onClickCompleted}>completed</button>
            </div>
        </div>
    )
}

