document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add a new task
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const taskInput = document.getElementById("new-task-description").value.trim();
    const priority = document.getElementById("task-priority").value;

    if (!taskInput) {
      alert("Enter a task!");
      return;
    }

    tasks.push({ description: taskInput, priority });
    saveAndRenderTasks();
    form.reset();
  });

  // Save tasks to localStorage and update the list
  function saveAndRenderTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  // Show tasks on the page
  function renderTasks() {
    taskList.innerHTML = "";

    tasks.sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority))
      .forEach((task, index) => {
        const li = document.createElement("li");
        li.style.color = getColor(task.priority);
        li.innerHTML = `
          <span contenteditable="true" data-index="${index}">${task.description}</span>
          <button data-index="${index}" class="delete-btn">❌</button>
        `;
        taskList.appendChild(li);
      });
  }

  // Convert priority to a number for sorting
  function priorityValue(priority) {
    return { high: 1, medium: 2, low: 3 }[priority];
  }

  // Get color based on priority
  function getColor(priority) {
    return { high: "red", medium: "orange", low: "green" }[priority];
  }

  // Delete a task when ❌ button is clicked
  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      tasks.splice(e.target.dataset.index, 1);
      saveAndRenderTasks();
    }
  });

  // Update task description when edited
  taskList.addEventListener("input", (e) => {
    tasks[e.target.dataset.index].description = e.target.textContent.trim();
    saveAndRenderTasks();
  });

  // Load tasks on page load
  renderTasks();
});
