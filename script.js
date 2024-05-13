// add a new task
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value === "") {
        alert("Please enter a task!");
        return;
    }

    var listItem = document.createElement("li");
    var taskText = document.createElement("span");
    var taskDateTime = document.createElement("span");
    
    var now = new Date();
    var timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    var formattedTime = now.toLocaleTimeString('en-US', timeOptions);
    var formattedDate = now.toLocaleDateString('en-US');

    taskText.textContent = taskInput.value;
    taskDateTime.textContent = formattedTime + " " + formattedDate;

    listItem.appendChild(taskText);
    listItem.appendChild(taskDateTime);
    taskList.appendChild(listItem);

    taskInput.value = "";

    // save tasks to local storage after adding a new task
    saveTasks();

    listItem.onclick = function () {
        this.parentNode.removeChild(this);
        // saves to browsers local storage 
        saveTasks();
    };
}


function clearTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    // clear tasks from Local Storage
    localStorage.removeItem("tasks");
}

// load tasks from local
function loadTasks() {
    var storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        document.getElementById("taskList").innerHTML = storedTasks;
        
        // Add onclick event to each loaded task for deletion
        var tasks = document.querySelectorAll("#taskList li");
        tasks.forEach(function(task) {
            task.onclick = function() {
                this.parentNode.removeChild(this);
                saveTasks();
            };
        });
    }
}

// saves tasks in browser storage
function saveTasks() {
    var taskList = document.getElementById("taskList").innerHTML;
    localStorage.setItem("tasks", taskList);
}

// Load tasks from Local Storage when the page loads
window.onload = function () {
    loadTasks();
};
