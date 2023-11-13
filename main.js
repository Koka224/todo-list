const form = document.getElementById("form");
const taskInput = document.getElementById("task");
const tasks = document.getElementById("tasks");
const clear = document.getElementById("clear");
document.addEventListener("DOMContentLoaded", loadTasks);
const notificationsContainer = document.getElementById("notifications");

form.addEventListener("submit", addTask);
clear.addEventListener("click", clearTasks);
function addTask(e) {
  e.preventDefault();
  if (taskInput.value == "") {
    return;
  }
  let currentDate = new Date();

  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let dateTimeString =
    " " +
    "(" +
    day +
    "." +
    month +
    "." +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    ")";

  const task = document.createElement("li");
  task.innerHTML = `
  <input type="checkbox">
  <p>${taskInput.value + dateTimeString}</p>
  <button type="buttton" class="btn-x">X</button>
  
  `;
  task
    .querySelector('input[type="checkbox"]')
    .addEventListener("change", toggleDone);
  task.querySelector("button").addEventListener("click", removeTask);
  tasks.appendChild(task);
  taskInput.value = "";
  saveTasksToLocalStorage();
  showNotification(`Успешно Добавлено: ${taskInput.value}`, "added");
}
function toggleDone(e) {
  const task = e.target.parentNode;
  task.querySelector("p").classList.toggle("done");
  saveTasksToLocalStorage();
}

function removeTask(e) {
  const task = e.target.parentNode;
  task.remove();
  saveTasksToLocalStorage();
  showNotification(`Успешно Удалено`, "removed");
}

function clearTasks() {
  while (tasks.firstChild) {
    tasks.removeChild(tasks.firstChild);
  }
  saveTasksToLocalStorage();
  showNotification(`Успешная Очистка`, "removed");
}

function saveTasksToLocalStorage() {
  const taskItems = tasks.innerHTML;
  localStorage.setItem("tasks", taskItems);
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks.innerHTML = savedTasks;

    tasks.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener("change", toggleDone);
    });

    tasks.querySelectorAll(".btn-x").forEach((button) => {
      button.addEventListener("click", removeTask);
    });
  }
}

function showNotification(message, actionClass) {
  const notification = document.createElement("div");
  notification.className = `notification ${actionClass}`;
  notification.innerText = message;
  notificationsContainer.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 1000);
}
