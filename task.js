const fs = require("fs");
const path = require("path");

const tasksFilePath = path.join(__dirname, "tasks.json");

const time = new Date().getTime();

function loadTasks() {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

function saveTasks(tasks) {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    throw error;
  }
}

function addTask(description) {
  const tasks = loadTasks();
  const lastTask = tasks.slice(-1)[0];
  const id = lastTask ? lastTask.id + 1 : 1;

  const task = {
    id,
    description,
    status: "todo",
    createdAt: time,
  };
  tasks.push(task);
  saveTasks(tasks);
  console.log(`Task added successfully (ID: ${id})`);
}

function updateTask(id, description) {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    console.error(`Task with ID ${id} not found.`);
    return;
  }
  task.description = description;
  task.updatedAt = new Date().getTime();
  saveTasks(tasks);
  console.log(`Task updated successfully.`);
}

function deleteTask(id) {
  let tasks = loadTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    console.error(`Task with ID ${id} not found.`);
    return;
  }
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks(tasks);
  console.log(`Task deleted successfully.`);
}

function markTask(id, newStatus) {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    console.error(`Task with ID ${id} not found.`);
    return;
  }
  task.status = newStatus;
  task.updatedAt = time;
  saveTasks(tasks);
  console.log(`Task marked as ${newStatus}.`);
}

const markTaskInProgress = (id) => markTask(id, "in-progress");

const markTaskDone = (id) => markTask(id, "done");

function listTasks(status) {
  let tasks = loadTasks();

  if (status) {
    tasks = tasks.filter((task) => task.status === status);
  }

  if (!tasks.length) {
    console.log("No Tasks Found");
    return;
  }

  console.log(`
----------------------------------------Tasks--------------------------------------------------------
ID  Description\t\tStatus\t\tCreatedAt\t\t\tUpdatedAt
-----------------------------------------------------------------------------------------------------`);

  const formatTime = (time) =>
    new Date().toDateString(time) +
    " " +
    new Date().toTimeString(time).slice(0, 8);

  for (const task of tasks) {
    console.log(
      `${task.id}.  ${task.description} \t${task.status}\t\t${formatTime(
        task.createdAt
      )}\t${formatTime(task.updatedAt)}`
    );
  }
}

// cli
const args = process.argv.slice(2);
const command = args[0];
const id = parseInt(args[1]);

if (command === "add") {
  addTask(args[1]);
} else if (command === "update") {
  updateTask(id, args[2]);
} else if (command === "delete") {
  deleteTask(id);
} else if (command === "mark-in-progress") {
  markTaskInProgress(id);
} else if (command === "mark-done") {
  markTaskDone(id);
} else if (command === "list") {
  listTasks(args[1]);
} else {
  console.error("Invalid command. Please try again.");
}
