let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "") {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  tasks
    .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach((task, index) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.className = "task-text";
      span.textContent = `${task.text} (Due: ${task.due || "N/A"})`;
      if (task.completed) span.classList.add("completed");
      span.onclick = () => toggleComplete(index);

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️";
      editBtn.className = "edit";
      editBtn.onclick = () => editTask(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.className = "delete";
      deleteBtn.onclick = () => deleteTask(index);

      li.appendChild(span);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      ul.appendChild(li);
    });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const dateInput = document.getElementById("dueDate");
  const text = input.value.trim();
  const due = dateInput.value;

  if (text) {
    tasks.push({ text, due, completed: false });
    saveTasks();
    input.value = "";
    dateInput.value = "";
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks(document.getElementById("searchInput").value);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks(document.getElementById("searchInput").value);
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks(document.getElementById("searchInput").value);
  }
}

function filterTasks() {
  const filter = document.getElementById("searchInput").value;
  renderTasks(filter);
}

renderTasks();