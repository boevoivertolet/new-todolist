import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';


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
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, newTitle:string, todoListId: string) => void
    filter: 'all' | 'active' | 'completed'
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void

}

export function Todolist(props: TodoListPropsType) {
    const removeTodoList = () => {
        props.removeTodoList(props.id);

    }
    const removeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle);

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
    const addTask = (title: string) => {
      props.addTask(title, props.id)
    }


    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={removeTodoListTitle}/>
                <button onClick={removeTodoList}>Delete</button>
            </h3>
            <AddItemForm addItem={addTask}

            />
            <ul className={'ul'}>
                {
                    props.tasks.map((t) => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeInputCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeInputTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return <li className={t.isDone ? 'is-done' : ''} key={t.id}><input
                            onChange={onChangeInputCheckboxHandler}
                            type="checkbox"
                            checked={t.isDone}/>
                            <EditableSpan
                                title={t.title}
                                onChange={onChangeInputTitleHandler}
                            />
                            <button onClick={onClickHandler}>Del
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





