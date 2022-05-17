import './App.css'
import {TasksType, Todolist} from './components/TodoList';
import {useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType

}
type TaskStateType = {
    [key: string]: Array<TasksType>
}

function App() {
// data (данные)

    //add hook
    /*let arr = useState(tasksForLearn)
    let tasks = arr[0];
    let setTasks = arr[1];*/

    /*   let [tasks, setTasks] = useState<TasksType[]>([
               {id: v1(), title: 'CSS/HTML', isDone: true},
               {id: v1(), title: 'JS', isDone: true},
               {id: v1(), title: 'React', isDone: false},
               {id: v1(), title: 'Redux', isDone: false}
           ]
       )*/


    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListId];
        let newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks;
        setTasksObj({...tasksObj})
    }

    // функция для удаление таски по нажатию кнопки
    // присваеваем tasksForLearn значение tasksForLearn после фильтрации
    //filter(t => t.id !== id) фильтр, пропусти те (t)таски id которых не равна id, которую надо удалить.
    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];

        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todoList = todoLists.find(tl => tl.id === todolistId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }


    }

    function changeStatus(taskID: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];

        let task = tasks.find(t => t.id === taskID);// Я в тасках ищу task.id, как только я его найду я запишу его в task
        if (task) {
            task.isDone = isDone
        }
        setTasksObj({...tasksObj});
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListId: string) {
        let tasks = tasksObj[todoListId];

        let task = tasks.find(t => t.id === taskID);// Я в тасках ищу task.id, как только я его найду я запишу его в task
        if (task) {
            task.title = newTitle
        }
        setTasksObj({...tasksObj});
    }

    let todoListsId1 = v1()
    let todoListsId2 = v1()
    let [todoLists, setTodoLists] = useState<TodoListsType[]>(
        [
            {id: todoListsId1, title: 'What to learn', filter: 'all'},
            {id: todoListsId2, title: 'What to buy', filter: 'all'},
        ]
    )
    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId];
        setTasksObj(tasksObj)

    }
    const changeTodoListTitle = (id: string, newTitle: string) => {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }
    let [tasksObj, setTasksObj] = useState<TaskStateType>({
        [todoListsId1]: [
            {id: v1(), title: 'CSS/HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListsId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'book', isDone: true},
            {id: v1(), title: 'beer', isDone: false},
            {id: v1(), title: 'water', isDone: false}
        ]
    });

    function addTodoList(title: string) {
        let todoList: TodoListsType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([todoList, ...todoLists])
        setTasksObj({
            ...tasksObj,
            [todoList.id]: []
        })

    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Todo List
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm
                        addItem={addTodoList}
                    />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((tl) => {
                            let tasksForTodoList = tasksObj[tl.id];
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
                            }
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            changeTodoListTitle={changeTodoListTitle}
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                        />
                                    </Paper>

                                </Grid>

                            )
                        })
                    }
                </Grid>
            </Container>

        </div>

    );
}

export default App;
