import './App.css'
import {TasksType, Todolist} from './components/TodoList';

function App() {
// data (данные)
    let tasksForLearn: TasksType[] = [
        {id: 1, title: 'CSS/HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ]

    // функция для удаление таски по нажатию кнопки
    // присваеваем tasksForLearn значение tasksForLearn после фильтрации
    //filter(t => t.id !== id) фильтр, пропусти те (t)таски id которых не равна id, которую надо удалить.
    function removeTask(id: number) {
        tasksForLearn = tasksForLearn.filter(t => t.id !== id)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForLearn}
                removeTask={removeTask}
            />

        </div>
    );
}

export default App;
