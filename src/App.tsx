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
    // resultTask переменная в которую попадут вс значения после фильтрации.
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
