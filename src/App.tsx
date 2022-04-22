import './App.css'
import {TasksType, Todolist} from './components/TodoList';
import {useState} from 'react';
import {v1} from 'uuid';

export type FilterValuesType = 'all'|'active'|'completed'

function App() {
// data (данные)

    //add hook
    /*let arr = useState(tasksForLearn)
    let tasks = arr[0];
    let setTasks = arr[1];*/

    let [tasks, setTasks] = useState<TasksType[]>([
            {id: v1(), title: 'CSS/HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ]
    )
    let [filter, setFilter] =useState<FilterValuesType>('all')


    // функция для удаление таски по нажатию кнопки
    // присваеваем tasksForLearn значение tasksForLearn после фильтрации
    //filter(t => t.id !== id) фильтр, пропусти те (t)таски id которых не равна id, которую надо удалить.
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList =tasks;
    if(filter === 'completed') {
        tasksForTodoList= tasks.filter(t=> t.isDone)
    }
    if(filter === 'active') {
        tasksForTodoList= tasks.filter(t=> !t.isDone)
    }




    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
