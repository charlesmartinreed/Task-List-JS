// DEFINE UI VARS
const form = document.getElementById('task-form');
const taskList = document.querySelector('ul.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

// LOADS THE EVENT LISTEENERS FOR THE PAGE
loadEventListeners();

function loadEventListeners() {
	//ADD TASK EVENT
	form.addEventListener('submit', addTask);
	//REMOVE TASK EVENT
	taskList.addEventListener('click', removeTask);
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

	//clear the input
	taskInput.value = '';
	e.preventDefault(); //prevent form submit
}

//REMOVE TASK FUNCTION
function removeTask(e) {
	//target the link, not the icon
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('Are you sure?')) {
			//parent of the parent is the li
			e.target.parentElement.parentElement.remove();
		}
	}
}
