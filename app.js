// DEFINE UI VARS
const form = document.getElementById('task-form');
const taskList = document.querySelector('ul.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

// LOADS THE EVENT LISTEENERS FOR THE PAGE
loadEventListeners();

function loadEventListeners() {
	//DOM LOAD EVENT
	document.addEventListener('DOMContentLoaded', getTasks);
	//ADD TASK EVENT
	form.addEventListener('submit', addTask);
	//REMOVE TASK EVENT
	taskList.addEventListener('click', removeTask);
	//CLEAR TASK EVENT
	clearBtn.addEventListener('click', clearTasks);
	//FILTER TASK EVENT
	filter.addEventListener('keyup', filterTasks);
}

//DISPLAY ANY EXISTING TASKS WHEN DOM LOADS
function getTasks(){
	let tasks;
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task){
		const li = document.createElement('li');
		li.className = 'collection-item';
		li.appendChild(document.createTextNode(task));

		const link = document.createElement('a');
		link.className = 'delete-item secondary-content';
		link.innerHTML = '<i class="far fa-trash-alt"></i>';
		li.appendChild(link);

		taskList.appendChild(li);
	});
}

//ADD TASK FUNCTION
function addTask(e) {
	if(taskInput.value === ''){
		alert('Please add a task first.');
	}

	//If we have input, CREATE LI ELEMENT
	const li = document.createElement('li');
	//this adds styling from Materalize.css
	li.className = 'collection-item';
	// Create text node and append to the li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create new link element

	//create the 'delete' icon element link
	const link = document.createElement('a');
	// secondary-content places to the right of an item in materialze.css
	link.className = 'delete-item secondary-content';
	link.innerHTML = '<i class="far fa-trash-alt"></i>';
	li.appendChild(link);

	//now, append the li to the ul
	taskList.appendChild(li);

	//save to localStorage
	storeTaskInLocalStorage(taskInput.value);

	//clear the input
	taskInput.value = '';
	e.preventDefault(); //prevent form submit
}

//STORE TASK LOCALLY
function storeTaskInLocalStorage(task){
	let tasks;
	//if tasks array doesn't exist, create it
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		//if it does exists, grab it, push the new task onto it
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

//REMOVE TASK FUNCTION
function removeTask(e) {
	//target the link, not the icon
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('Are you sure?')) {
			//parent of the parent is the li
			e.target.parentElement.parentElement.remove();

			//remove from local stroage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task, index){
		if(taskItem.textContent === task) {
			tasks.splice(index, 1); //one from index means the found task
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

//CLEAR TASKS FUNCTION
function clearTasks(e) {
	let taskNodes = Array.from(taskList.childNodes);
	taskNodes.forEach(function(task){
		taskList.removeChild(task);
	});

	clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
	localStorage.clear();
}

//FILTER TASKS FUNCTION
function filterTasks(e) {
	//grab what is being typed
	const text = e.target.value.toLowerCase();

	//grab all the list items - we can use a for each because querySelectorAll returns a node list
	document.querySelectorAll('.collection-item').forEach(function(task){
		const item = task.firstChild.textContent;
		//if the text can be found, it will have a beginning index in this item
		if (item.toLowerCase().indexOf(text) != -1) {
			//show to task in the task list UI
			task.style.display = 'block';
		} else {
			//hide the task that doesn't match
			task.style.display = 'none';
		}
	});
}
