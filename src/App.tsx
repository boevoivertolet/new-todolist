import './App.css'
import {TasksType, Todolist} from './components/TodoList';
import {useState} from 'react';

function App() {
// data (данные)
    let tasksForLearn: TasksType[] = [
        {id: 1, title: 'CSS/HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ]
    //add hook
    let arr = useState(tasksForLearn)
    let tasks = arr[0];
    let setTasks = arr[1];


    // функция для удаление таски по нажатию кнопки
    // присваеваем tasksForLearn значение tasksForLearn после фильтрации
    //filter(t => t.id !== id) фильтр, пропусти те (t)таски id которых не равна id, которую надо удалить.
    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasks}
                removeTask={removeTask}
            />

        </div>
    );
}

export default App;
