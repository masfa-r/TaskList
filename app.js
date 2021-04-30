const form = document.querySelector('.task-form');
const taskInput = document.querySelector('#task');
const addBtn = document.querySelector('.Add-task');
const taskList = document.querySelector('.collection');

// load events
loadEvents();

function loadEvents(){
    // Add tasks on clickingbtn
    addBtn.addEventListener('click', addTask);
    // Remove Task Events
    taskList.addEventListener('click',removeTask);
    // Edit Task 
    taskList.addEventListener('click', editTask);
}

// Adding Tasks
function addTask(e){
    if(taskInput.value === ''){
        alert('Enter task first...');
    }else{
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const span = document.createElement('span');
    const link_edit = document.createElement('a');
    link_edit.className = 'update-item secondary-content';
    link_edit.innerHTML = '<i class="fa fa-pencil"></i>';
    span.appendChild(link_edit);
    const link_del = document.createElement('a');
    link_del.className = 'del-item secondary-content';
    link_del.innerHTML = '<i class="fa fa-trash"></i>';
    span.appendChild(link_del);

    li.appendChild(span);
    taskList.appendChild(li);

    taskInput.value='';
    }
    e.preventDefault();
}

// Remove Task Function
function removeTask(e){
    e.preventDefault();
    e.stopPropagation();
    if(e.target.parentElement.classList.contains('del-item')){
    e.target.parentElement.parentElement.parentElement.remove();  
}
}

function editTask(e){
    e.preventDefault();
    e.stopPropagation();
    if(e.target.parentElement.classList.contains('update-item')){
        // console.log(e.target.parentElement.parentElement.parentElement);
    let editedTask = prompt('Edit your task...');
    e.target.parentElement.parentElement.parentElement.innerHTML = 
    `${editedTask}
   <span>
   <a  class="update-item secondary-content"><i class="fa fa-pencil"></i></a> 
   <a  class="del-item  secondary-content"> <i class="fa fa-trash"></i></a>
   </span>`;


// e.target.parentElement.parentElement.parentElement.firstChild.nodeValue = editedTask;


   }

// }

}