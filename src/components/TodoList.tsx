import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../App';


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    id: string
    title: string
    tasks: TasksType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListId: string) => void
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
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }

    }
    const onClickButtonHandler = () => {
        addNewTaskTitle();
    }


    const onClickAll = () => {
        props.changeFilter('all', props.id)
    }
    const onClickActive = () => {
        props.changeFilter('active', props.id)
    }
    const onClickCompleted = () => {
        props.changeFilter('completed', props.id)
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
                        const onClickHandler = () => props.removeTask(t.id , props.id)
                        const onChangeInputCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked , props.id)
                        }

                        return <li className={t.isDone ? 'is-done' : ''} key={t.id}><input
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
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAll}>all</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickActive}>active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onClickCompleted}>completed
                </button>
            </div>
        </div>
    )
}

