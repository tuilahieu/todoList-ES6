var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var newdate =  + month + "/" + day + "/" + year;
date.innerHTML = newdate;

// oop

class Todo {
    constructor(_todoName, _type) {
        this.id = Math.round(Math.random(Date.now()) * Date.now());
        this.todoName = _todoName;
        this.type = _type;
    }
}

// todo list

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

const renderTodoList = (listTodo) => {
    listTodo.forEach(todo => {
        createTodo(todo);
    });
    
}

const createTodo = (todo) => {
    const li = `<li>
    <p>${todo.todoName}</p>
    <div class="todo-control">
    <i class="fas fa-check" style="margin-right: 6px;cursor: pointer;" onclick="toCompleteTodo(${todo.id})"></i>
        <i class="fas fa-trash" style="color: #FA396B;cursor: pointer;" onclick="deleteTodo(${todo.id})"></i>
    </div>
</li>`;
console.log(todo);
    if(todo.type === 'uncompleted') document.getElementById('todo').innerHTML += li;
    if(todo.type === 'completed') document.getElementById('completed').innerHTML += li;
    }

renderTodoList(todoList);

const addTodo = () => {
    let todo = new Todo(newTask.value ? newTask.value : `this todo's title is empty !`, 'uncompleted');
    createTodo(todo);
    saveToLocalStorage(todo, 'todoList', todoList);
    newTask.value = '';
}

addItem.addEventListener('click', addTodo);
window.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') addTodo();
});

const saveToLocalStorage = (todo, type, todoList) => {
    todoList.push(todo);
    localStorage.setItem(`${type}`, JSON.stringify(todoList));
}

const toCompleteTodo = (id) => {
    let indexTodoCompleted = todoList.findIndex((todo) => todo.id === id);
    todoList[indexTodoCompleted].type = 'completed';
    localStorage.setItem('todoList', JSON.stringify(todoList));
    completed.innerHTML = '';
    todo.innerHTML = '';
    renderTodoList(todoList);
}

const deleteTodo = (id) => {
    let indexTodoDeleting = todoList.findIndex((todo) => todo.id === id);
    todoList.splice(indexTodoDeleting, 1); 
    localStorage.setItem('todoList', JSON.stringify(todoList));
    completed.innerHTML = '';
    todo.innerHTML = '';
    renderTodoList(todoList);
}