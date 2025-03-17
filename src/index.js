document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  const taskInput = document.getElementById('new-task-description');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskDescription = taskInput.value.trim();

    if (taskDescription) {
      const li = document.createElement('li');
      li.textContent = taskDescription;
      taskList.appendChild(li);
      taskInput.value = '';
    }
  });
  const deleteButton = document.createElement("button");
            deleteButton.textContent = "delete";
            //deleteButton.style.marginLeft = "10px";
            deleteButton.addEventListener("click", () => {
              taskItem.remove();
            });
});