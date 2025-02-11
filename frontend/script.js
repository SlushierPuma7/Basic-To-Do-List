async function loadTasks() {
    let response = await fetch('/api/tasks');
    let tasks = await response.json();
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task.task;
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

async function addTask() {
    let taskInput = document.getElementById('taskInput');
    let task = taskInput.value;
    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    });
    taskInput.value = '';
    loadTasks();
}

async function deleteTask(taskId) {
    let response = await fetch(`http://docker01-alex:5000/tasks/${taskId}`, {  // Adjust based on setup
        method: 'DELETE'
    });

    if (response.ok) {
        loadTasks();  // Reload the list after deletion
    } else {
        alert("Failed to delete task");
    }
}

document.addEventListener('DOMContentLoaded', loadTasks);
