document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskInput = document.getElementById("new-task-description");
    const userInput = document.getElementById("task-user");
    const prioritySelect = document.getElementById("task-priority");

    const taskText = taskInput.value.trim();
    const userText = userInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText === "") return;

    const taskItem = document.createElement("li");
    taskItem.innerHTML = <strong>${taskText}</strong> (Assigned to: ${userText});
    taskItem.style.color = getPriorityColor(priority);
    taskItem.style.transition = "all 0.3s ease";

    const completeButton = document.createElement("button");
    completeButton.textContent = "✔";
    completeButton.style.marginLeft = "10px";
    completeButton.addEventListener("click", () => {
      taskItem.style.textDecoration = taskItem.style.textDecoration === "line-through" ? "none" : "line-through";
      taskItem.style.opacity = taskItem.style.opacity === "0.5" ? "1" : "0.5";
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    //editButton.style.marginLeft = "10px";
    editButton.addEventListener("click", () => {
      const newTaskText = prompt("Edit task:", taskText);
      const newUserText = prompt("Edit assigned user:", userText);
      if (newTaskText !== null && newUserText !== null) {
        taskItem.innerHTML = <strong>${newTaskText}</strong> (Assigned to: ${newUserText});
        taskItem.style.color = getPriorityColor(priority);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(timerButton);
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    //deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", () => {
      taskItem.remove();
    });


    taskItem.appendChild(completeButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(timerButton);
    taskList.appendChild(taskItem);

    taskInput.value = "";
    userInput.value = "";
  });

  function getPriorityColor(priority) {
    switch (priority) {
      case "high": return "red";
      case "medium": return "orange";
      case "low": return "green";
      default: return "black";
    }
  }
});
