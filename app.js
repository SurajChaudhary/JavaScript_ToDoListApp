//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const addBtn = document.querySelector('#addBtn');

//Load all event listeners call
loadEventlisteners();


//Load all event listeners function
function loadEventlisteners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', populateTasks);

  //Add Task event
  form.addEventListener('submit',addTask);

  //Delete or Remove Task event
  taskList.addEventListener('click',removeTask);

  //Clear tasks event
  clearBtn.addEventListener('click',clearTasks);

  //Filter task event
  filter.addEventListener('keyup',filterTasks);
}

//Function to populate Tasks
function populateTasks() {
  //Get tasks from local storage
  let tasks = getTasksFromLocalStorage();
  //Add tasks to list.
  tasks.forEach(function(task){createTaskLineItem(task);});
}

function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }
  createTaskLineItem(taskInput.value);
  //Store in localStorage
  storeTaskInLocalStorage(taskInput.value);
  //Clear input
  taskInput.value = '';
  e.preventDefault();
}

//Function to store tasks in local storage.
function storeTaskInLocalStorage(task){
  let tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  if(localStorage.getItem('tasks') === null){
    return [];
  }else{
    return JSON.parse(localStorage.getItem('tasks'));
  }
}

//remove Task function
function removeTask(e){
  //Since clicking on x(link) actually gives us the inner element, its child which is an i tag
  //we have to check the parent of i tag means the a tag.
  if(e.target.parentElement.classList.contains('delete-item')){
    //while removing we want to remove li, which is the parent of a tag.
    if(confirm('Are you sure?')){
      //Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      e.target.parentElement.parentElement.remove();
    }
  }
  e.preventDefault();
}

//Clear Tasks function
function clearTasks(e) {
  //one way is to clear the whole innerHTML of ul(taskList)
  //taskList.innerHTML = '';
  //Other way is to loop through taskList and remove each li. Which is faster.
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  //Clear tasks from local storage.
  localStorage.clear();

}

//Filter task function.
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}

function createTaskLineItem(task){
  //Create li element for task
  const li = document.createElement('li');
  //Add a class
  li.className = 'collection-item';

  //Create text node and append to the li
  li.appendChild(document.createTextNode(task));

  //Create link element to represent delete button
  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item secondary-content';
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append link to li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
