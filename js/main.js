var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var newdate = +month + "/" + day + "/" + year;
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
  listTodo.forEach((todo) => {
    createTodo(todo);
  });
};

const createTodo = (todo) => {
  const li = `<li>
    <p>${todo.todoName}</p>
    <div class="todo-control">
    <i class="fas fa-check" style="margin-right: 6px;cursor: pointer;" onclick="toCompleteTodo(${todo.id})"></i>
        <i class="fas fa-trash" style="color: #FA396B;cursor: pointer;" onclick="deleteTodo(${todo.id})"></i>
    </div>
</li>`;
  if (todo.type === "uncompleted")
    document.getElementById("todo").innerHTML += li;
  if (todo.type === "completed")
    document.getElementById("completed").innerHTML += li;
};

renderTodoList(todoList);

const addTodo = () => {
  if (newTask.value === "") {
    alert("Your todo has not title !");
    return;
  }
  let todo = new Todo(newTask.value, "uncompleted");
  createTodo(todo);
  saveToLocalStorage(todo, "todoList", todoList);
  newTask.value = "";
};

addItem.addEventListener("click", addTodo);
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

const saveToLocalStorage = (todo, type, todoList) => {
  todoList.push(todo);
  localStorage.setItem(`${type}`, JSON.stringify(todoList));
};

const toCompleteTodo = (id) => {
  let indexTodoCompleted = todoList.findIndex((todo) => todo.id === id);
  todoList[indexTodoCompleted].type === "uncompleted"
    ? (todoList[indexTodoCompleted].type = "completed")
    : (todoList[indexTodoCompleted].type = "uncompleted");
  localStorage.setItem("todoList", JSON.stringify(todoList));
  completed.innerHTML = "";
  todo.innerHTML = "";
  renderTodoList(todoList);
};

const deleteTodo = (id) => {
  let indexTodoDeleting = todoList.findIndex((todo) => todo.id === id);
  todoList.splice(indexTodoDeleting, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  completed.innerHTML = "";
  todo.innerHTML = "";
  renderTodoList(todoList);
};

// filter A-Z
const FilterButtonAZ = document.querySelector(".filter-btn #two");
const FilterButtonZA = document.querySelector(".filter-btn #three");

FilterButtonAZ.addEventListener("click", () => {
  sortTodoList("A");
});

FilterButtonZA.addEventListener("click", () => {
  sortTodoList("Z");
});

function sortTodoList(dir) {
  if (dir === "A") {
    todoList.sort((a, b) => a.todoName.localeCompare(b.todoName));
    localStorage.setItem("todoList", JSON.stringify(todoList));
    completed.innerHTML = "";
    todo.innerHTML = "";
    renderTodoList(todoList);
  } else if (dir === "Z") {
    todoList.sort((a, b) => b.todoName.localeCompare(a.todoName));
    localStorage.setItem("todoList", JSON.stringify(todoList));
    completed.innerHTML = "";
    todo.innerHTML = "";
    renderTodoList(todoList);
  }
}
