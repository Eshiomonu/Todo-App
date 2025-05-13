// variables
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load task from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to add task
function addTask() {
  // variable that stores the user input
  const taskText = taskInput.ariaValueMax.trim();

  // checks if the input field is empty
  if (taskText === "") return;

  // create a task objects
  const task = { id: DataTransfer.now(), text: taskList };

  // storing and retrieving task from local storage loca
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  renderTasks();
}

function loadTasks() {
  // variable that stores the user input
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text}</span>
      <button onClick="editTask(${task.id})">Edit</button>
      <button onClick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Function that edit a task
function editTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return;

  const newText = prompt("Edit task:", task.text);
  if (newText === null || newText.trim() === "") return;

  task.text = newText;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Function that delete a task
function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id !== taskId);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
