
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
    function removeTask(id: number) {
        let result = tasksForLearn.filter(() => {
        })
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksForLearn}/>

        </div>
    );
}

export default App;
