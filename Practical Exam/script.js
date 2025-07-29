// script.js

// ========== Global Variables ==========
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingTaskId = null;

// ========== DOM Elements ==========
const taskForm = document.getElementById('taskForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('dueDate');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('taskList');
const filterPriority = document.getElementById('filterPriority');
const searchInput = document.getElementById('searchInput');

// ========== Event Listeners ==========
taskForm.addEventListener('submit', handleFormSubmit);
filterPriority.addEventListener('change', displayTasks);
searchInput.addEventListener('input', displayTasks);

// ========== Functions ==========

// 1. Handle form submission (Add/Edit)
function handleFormSubmit(e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  // Validation
  if (!title || !dueDate || !priority) {
    alert("Title, Due Date, and Priority are required.");
    return;
  }

  const task = {
    id: editingTaskId || Date.now(),
    title,
    description,
    dueDate,
    priority
  };

  if (editingTaskId) {
    // Edit existing task
    tasks = tasks.map(t => t.id === editingTaskId ? task : t);
    editingTaskId = null;
  } else {
    // Add new task
    tasks.push(task);
  }

  saveTasks();
  clearForm();
  displayTasks();
}

// 2. Save to Local Storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 3. Display Tasks
function displayTasks() {
  const filter = filterPriority.value;
  const search = searchInput.value.toLowerCase();

  taskList.innerHTML = '';

  tasks
    .filter(task => {
      const matchesPriority = filter ? task.priority === filter : true;
      const matchesSearch =
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search);
      return matchesPriority && matchesSearch;
    })
    .forEach(task => {
      const taskCard = document.createElement('div');
      taskCard.className = `task-card ${task.priority}`;

      taskCard.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description || 'No description'}</p>
        <p><strong>Due:</strong> ${task.dueDate}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <div class="task-actions">
          <button onclick="editTask(${task.id})">Edit</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;

      taskList.appendChild(taskCard);
    });
}

// 4. Edit Task
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  titleInput.value = task.title;
  descriptionInput.value = task.description;
  dueDateInput.value = task.dueDate;
  priorityInput.value = task.priority;
  editingTaskId = task.id;

  // Scroll to top for better UX
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 5. Delete Task
function deleteTask(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    displayTasks();
  }
}

// 6. Clear Form
function clearForm() {
  titleInput.value = '';
  descriptionInput.value = '';
  dueDateInput.value = '';
  priorityInput.value = '';
  editingTaskId = null;
}

// 7. Initial Display
displayTasks();