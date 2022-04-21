import React from 'react';


export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: number) => void
}

export function Todolist(props: TodoListPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        return <li><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {props.removeTask(t.id)} }>-</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={()=> {}}>all</button>
                <button>active</button>
                <button>completed</button>
            </div>
        </div>
    )
}

