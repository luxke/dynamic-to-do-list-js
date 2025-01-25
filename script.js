document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    tasks.forEach(taskText => {
      const taskItem = createTaskElement(taskText);
      taskList.appendChild(taskItem);
    });
  }

 function createTaskElement(taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add('remove-btn');

    removeButton.onclick = () => {
      taskList.removeChild(taskItem);
      tasks = tasks.filter(task => task !== taskText);
      saveTasksToLocalStorage();
    };

    taskItem.appendChild(removeButton);
    taskItem.classList.add('task-item');
    return taskItem;
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    if (tasks.includes(taskText)) {
      alert("Task already exists.");
      return;
    }

    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);

    tasks.push(taskText);
    saveTasksToLocalStorage();

    taskInput.value = "";
  }

  addButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addTask();
  });

  loadTasks();
});


