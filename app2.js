const form = document.querySelector('.task-form');
const taskInput = document.querySelector('#task');
const addBtn = document.querySelector('.Add-task');
const taskList = document.querySelector('.collection');
const dateDisplay = document.querySelector('.current-date')

loadEvents();

function loadEvents() {
    // Get task from LS on load
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add tasks on clickingbtn
    addBtn.addEventListener('click', addTask);
    // Edit Task 
    taskList.addEventListener('click', editTask);
    // Mark as done
    taskList.addEventListener('click', markAsDone);
}

// Get Tasks from Local Storage

function getTasks(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {

        // Create task list
        const li = document.createElement('li');
        li.className = 'collection-item';
        // li.appendChild(document.createTextNode(task));
        const para = document.createElement('p');
        para.appendChild(document.createTextNode(task));
         li.appendChild(para);
        const span = document.createElement('span');
        // Edit button
        const link_edit = document.createElement('i');
        link_edit.setAttribute("class", "fa fa-pencil update-item secondary-content");
        span.appendChild(link_edit);
        // Del button
        const link_del = document.createElement('i');
        link_del.setAttribute("class", "fa fa-trash del-item secondary-content");
        span.appendChild(link_del);

        li.appendChild(span);
        taskList.appendChild(li);

        // Delete task function
        link_del.onclick =
            function removeTask() {
                link_del.parentElement.parentElement.remove();
                removeFromLocalStorage(li);
            }
    })
}

// Adding Tasks in Collection

function addTask(e) {
    // Check if input is empty
    if (taskInput.value === '') {
        alert('Enter task first...');
    }
    else {
        const li = document.createElement('li');
        li.className = 'collection-item';
        
        const para = document.createElement('p');
        para.appendChild(document.createTextNode(taskInput.value));
         li.appendChild(para);

        const span = document.createElement('span');
        // Edit button
        const link_edit = document.createElement('i');
        link_edit.setAttribute("class", "fa fa-pencil update-item secondary-content");
        span.appendChild(link_edit);
        // Del button
        const link_del = document.createElement('i');
        link_del.setAttribute("class", "fa fa-trash del-item secondary-content");
        span.appendChild(link_del);

        li.appendChild(span);
        taskList.appendChild(li);

        // Store tasks in Local Storage
        storeInLocalStorage(taskInput.value);

        // Delete task function
        link_del.onclick =
            function removeTask() {
                link_del.parentElement.parentElement.remove();
                removeFromLocalStorage(li);
            }
        taskInput.value = '';
    }
    e.preventDefault();
}

// Edit Task function

function editTask(e) {
    if (e.target.classList.contains('update-item')) {
        let editedTask = prompt('Edit your task...');
        if (editedTask === null || editedTask === "") {
            return;
        } else {
            removeFromLocalStorage(e.target.parentElement.parentElement);
            e.target.parentElement.parentElement.firstChild.innerHTML = editedTask;
            storeInLocalStorage(editedTask);
        }
        e.preventDefault();
    }
}

// Store Task in Local Storage
function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Remove from Local Storage

function removeFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// markAsDone
function markAsDone(e) {
    if (e.target.classList.contains('collection-item')) {

        e.target.classList.toggle("toggle");
    }

}

// Current Day and Date
const date = new Date();
let currentDay, currentMonth;

let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
currentDay = day[date.getDay()];
// if(date.getDay()=== 0){
//     currentDay = 'Sunday';
// }
// else if(date.getDay()=== 1){
//     currentDay = 'Monday';
// }
// else if(date.getDay()=== 2){
//     currentDay = 'Tuesday';
// }
// else if(date.getDay()=== 3){
//     currentDay = 'Wednesday';
// }
// else if(date.getDay()=== 4){
//     currentDay = 'Thursday';
// }
// else if(date.getDay()=== 5){
//     currentDay = 'Friday';
// }
// else {
//     currentDay = 'Saturday';
// }

// console.log(currentDay);

let Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

currentMonth = Month[date.getMonth()];
let currentDate = date.getDate();
let currentYear = date.getFullYear();


dateDisplay.innerHTML = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;
