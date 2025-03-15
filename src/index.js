document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskInput = document.getElementById("new-task-description").value.trim();
    const priority = document.getElementById("task-priority").value;

    if (!taskInput) return alert("Enter a task!");

    tasks.push({ description: taskInput, priority });
    updateTasks();
    form.reset();
  });

  function updateTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  function renderTasks() {
    taskList.innerHTML = tasks
      .sort((a, b) => ({ high: 1, medium: 2, low: 3 }[a.priority] - { high: 1, medium: 2, low: 3 }[b.priority]))
      .map((task, i) => `
        <li style="color: ${getColor(task.priority)}">
          <span contenteditable="true" data-index="${i}">${task.description}</span>
          <button data-index="${i}">❌</button>
        </li>
      `)
      .join("");
  }

  function getColor(priority) {
    return { high: "red", medium: "orange", low: "green" }[priority];
  }

  taskList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      tasks.splice(e.target.dataset.index, 1);
      updateTasks();
    }
  });

  taskList.addEventListener("input", (e) => {
    tasks[e.target.dataset.index].description = e.target.textContent.trim();
    updateTasks();
  });

  renderTasks();
});
