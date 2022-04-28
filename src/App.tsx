import './App.css'
import {TasksType, Todolist} from './components/TodoList';
import {useState} from 'react';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType

}

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



    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    // функция для удаление таски по нажатию кнопки
    // присваеваем tasksForLearn значение tasksForLearn после фильтрации
    //filter(t => t.id !== id) фильтр, пропусти те (t)таски id которых не равна id, которую надо удалить.
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function changeStatus(taskID: string, isDone: boolean) {

        let task = tasks.find(t => t.id === taskID);// Я в тасках ищу task.id, как только я его найду я запишу его в task
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks]);
    }





    let todoLists: TodolistsType[] = [
        {id: v1(), title: 'What to learn', filter: 'active'},
        {id: v1(), title: 'What to buy', filter: 'completed'},
    ]

    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    let tasksForTodoList = tasks;
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasks.filter(t => t.isDone);
                    }
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasks.filter(t => !t.isDone);
                    }

                    return (
                        <Todolist
                            title={tl.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;
