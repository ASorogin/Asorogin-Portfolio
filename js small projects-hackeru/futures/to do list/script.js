const inputFiled = document.querySelector(".input-filed textarea"),
    todoList = document.querySelector(".todolists"),
    pendingNum = document.querySelector(".pending-num"),
    clearButton = document.querySelector(".clear-button");

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const liTag = `
            <li class="list ${task.status}" onclick="handleStatus(this)">
                <input type="checkbox" ${task.status === "done" ? "checked" : ""}>
                <span class="task">${task.text}</span>
                <i class="uil uil-trash-alt" onclick="deleteTask(this)"></i>
            </li>`;
        todoList.insertAdjacentHTML("beforeend", liTag);
    });
    allTasks();
}

// Load tasks when the page loads
window.addEventListener("load", loadTasks);

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = Array.from(todoList.querySelectorAll(".list")).map(li => ({
        text: li.querySelector(".task").textContent,
        status: li.classList.contains("done") ? "done" : "pending"
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listener for input field
inputFiled.addEventListener("keyup", (e) => {
    let inputVal = inputFiled.value.trim();

    if (e.key === "Enter" && inputVal.length > 0) {
        const liTag = `<li class="list pending" onclick="handleStatus(this)">
            <input type="checkbox">
            <span class="task">${inputVal}</span>
            <i class="uil uil-trash-alt" onclick="deleteTask(this)"></i>
        </li>`;
        todoList.insertAdjacentHTML("beforeend", liTag);
        inputFiled.value = "";
        saveTasks();
        allTasks();
    }
});

// Function to handle task status
function handleStatus(e) {
    const checkbox = e.querySelector("input");
    checkbox.checked = !checkbox.checked;
    e.classList.toggle("pending");
    e.classList.toggle("done");
    saveTasks();
    allTasks();
}

// Function to delete task
function deleteTask(e) {
    e.parentElement.remove();
    saveTasks();
    allTasks();
}

// Event listener for clear button
clearButton.addEventListener("click", () => {
    todoList.innerHTML = "";
    saveTasks();
    allTasks();
});

// Function to update pending task count
function allTasks() {
    const tasks = document.querySelectorAll(".pending");
    pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;
    const allLists = document.querySelectorAll(".list");
    if (allLists.length > 0) {
        todoList.style.marginTop = "20px";
        return;
    }
    todoList.style.marginTop = "0px";
}
